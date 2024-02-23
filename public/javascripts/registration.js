const centerVertically = (element) => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const elementHeight = element.offsetHeight;
    const topOffset = (windowHeight - elementHeight) / 2 + scrollY;
    element.style.top = `${topOffset}px`;
}

const closeMessage = () => {
    const bodyOpacity = document.querySelector('body')
    const wrapperMessage = document.querySelector('.wrapper-presence-status')

    bodyOpacity.classList.remove('opacity')
    wrapperMessage.classList.add('hidden')
}

const createChildElement = (child, text) => {
    const childElement = document.createElement(child)
    
    if (child === 'img') {
        childElement.src = `/medias/${text}.png`
    } else if (child === 'h1') {
        childElement.innerText = text
    } else if (child === 'button') {
        childElement.addEventListener('click', closeMessage)
        childElement.innerText = text
    }

    return childElement
}

const createElements = (parentElement, classAdd, child, text) => {
    const element = document.createElement(parentElement)
    element.classList.add(classAdd)
    element.appendChild(createChildElement(child, text))

    return element
}

const showStatusMessage = (message, status) => {
    const body = document.querySelector('body')
    const wrapper = document.querySelector('.wrapper-presence-status')
    wrapper.innerHTML = ''
    wrapper.classList.remove('hidden')

    let image
    let messageFormatted

    if (status === 'OK') {
        image = 'checked'
        messageFormatted = `${message} Será um prazer tê-los conosco!` 
    } else if (status === 'ERROR') {
        image = 'cancel'
        messageFormatted = `${message} Tente novamente ou contate os noivos!`
    }

    wrapper.appendChild(createElements('section', 'status-image-container', 'img', image))
    wrapper.appendChild(createElements('section', 'message-container', 'h1', messageFormatted))
    wrapper.appendChild(createElements('section', 'return-button-container', 'button', 'Voltar'))

    centerVertically(wrapper)
    body.classList.add('opacity')
}

const sendRegister = async (guestName) => {
    const data = { nome: guestName}
    const results = await fetch('/database/convidados', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return results
}

const setRegistration = () => {
    const form = document.querySelector('#form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const guestInput = document.querySelector('#name-input')
        const guestName = guestInput.value

        if (guestName.length <= 0) return

        const response = await sendRegister(guestName)
        if (response.status === 201) {
            const success = await response.json()
            showStatusMessage(success.message, 'OK')
            form.reset()
        } else {
            const error = await response.json()
            showStatusMessage(error.message, 'ERROR')
            form.reset()
        }
    });
}

window.addEventListener('load', () => {
    setRegistration()
})