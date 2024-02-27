const formatNum = (num) => {
    if (num < 10) {
        return `0${num}`
    } else {
        return num
    }
}

const getRequest = (method, data) => {
    if (method === 'list') {
        return '/database/convidados'
    } else if (method === 'findBy') {
        return `/database/convidados/${data}`
    } else if (method === 'findAndDelete') {
        return `/database/convidados/${data}`
    }
}

const centerVertically = (element) => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const elementHeight = element.offsetHeight;
    const topOffset = (windowHeight - elementHeight) / 2 + scrollY;
    element.style.top = `${topOffset}px`;
}

const removeGuestById = async (id) => {
    const req = getRequest('findAndDelete', id)
    const options = {
        method: 'DELETE'
    }

    const results = await fetch(req, options)

    if (results.status !== 200) {
        return false
    } else {
        return true
    }
}

const adjustGuestNumber = () => {
    const guestArray = document.querySelectorAll('.guest-container')
    guestArray.forEach((guestContainer, index) => {
        let numberElement = guestContainer.querySelector('.guest-number')
        let number = index + 1
        numberElement.innerText = formatNum(number)
    })   
}

const getGuestId = async (method, data) => {
    const req = getRequest(method, data)
    const results = await fetch(req)
    const guestData = await results.json()

    return guestData[0]._id
}

const createSections = (classAdd) => {
    const container = document.createElement('section')
    
    if (classAdd === 'text-container') {
        container.classList.add(classAdd)
        const text = document.createElement('h1')
        text.innerText = 'Tem certeza que deseja remover esse convidado?'
        container.appendChild(text)
        
        return { container }
    } else if (classAdd === 'button-container') {
        container.classList.add(classAdd)
        const yButton = document.createElement('button')
        const nButton = document.createElement('button')
        yButton.innerText = 'Sim'
        nButton.innerText = 'Não'

        container.appendChild(yButton)
        container.appendChild(nButton)

        return { container, yButton, nButton }
    }
}

const createWrapper = () => {
    const wrapperConfirm = document.querySelector('.wrapper-confirm-delete')
    wrapperConfirm.innerHTML = ''
    wrapperConfirm.classList.remove('hidden')

    const textAppend = createSections('text-container')
    wrapperConfirm.appendChild(textAppend.container)

    const buttonsAppend = createSections('button-container')
    wrapperConfirm.appendChild(buttonsAppend.container)

    centerVertically(wrapperConfirm)

    return { wrapperConfirm, buttonsAppend }
}

const guestRemove = (guestElement) => {
    const resCreated = createWrapper()

    const wrapper = resCreated.wrapperConfirm

    const buttonRemove = resCreated.buttonsAppend.yButton
    const buttonCancel = resCreated.buttonsAppend.nButton

    buttonRemove.addEventListener('click', async () => {
        const guestName = guestElement.innerText
        const guestId = await getGuestId('findBy', guestName)
        removeGuestById(guestId)
        guestElement.parentNode.remove()
        adjustGuestNumber()
        wrapper.classList.add('hidden')
    })

    buttonCancel.addEventListener('click', () => {
        wrapper.classList.add('hidden')
    })
} 

const createChildElements = (guest, element, classAdd, number) => {
    const container = document.createElement(element)
    container.classList.add(classAdd)

    container.addEventListener('dblclick', (e) => {
        const guestTarget = e.target
        guestRemove(guestTarget)
    })

    let guestNum = number + 1
    if (classAdd === 'guest-number') {
        container.innerText = formatNum(guestNum)
    } else if (classAdd === 'guest-name') {
        container.innerText = guest.nome
    }

    return container
}

const setGuest = (guest, index) => {
    const container = document.createElement('section')
    container.classList.add('guest-container')

    container.appendChild(createChildElements(guest, 'section', 'guest-number', index))
    container.appendChild(createChildElements(guest, 'section', 'guest-name', index))
    return container
}

const updateGuest = (guestData) => {
    const guestListContainer = document.querySelector('.guest-list')
    guestData.forEach((guest, index) => {
        guestListContainer.appendChild(setGuest(guest, index))
    })
}

const getGuestList = async () => {
    const req = getRequest('list')
    const results = await fetch(req)
    
    return results
}

window.addEventListener('load', async () => {
    const response = await getGuestList()

    if (response.status === 200) {
        const guestData = await response.json()
        updateGuest(guestData)
    } else {
        const data = response.json()
        const errorMessage = data.message
        console.log(errorMessage)
    }
})