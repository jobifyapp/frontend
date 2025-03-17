// JOBIFY.JS 1.0 February 2024 by Emerson Reinhard //

const modals = document.getElementsByClassName('modalWrapper')


window.onclick = function(event) {
    console.log(`window.onclick function called`)
    console.log(event.target)

    for (let modal of modals) {
        if (event.target == modal) {
            contactmodal.classList.add('hidden')
        }
    }
}

const contactopen = document.getElementById('contact-open')
const contactmodal = document.getElementById('contactModal')

contactopen.addEventListener('click', () => {
    contactmodal.classList.remove('hidden')
})

const cookieclose = document.getElementById('cookies-close')
const cookiebanner = document.getElementById('cookies')

cookieclose.addEventListener('click', () => {
    cookiebanner.remove()
})

// Extracted from portal.js //

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.href === '/login') {
        document.getElementById('login-modal').addEventListener('submit', async (e) => {
            e.preventDefault()
            const email = document.getElementById('input-email')
            const password = document.getElementById('input-password')

            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                window.location.href = '/'
            } else {
                alert(data.error)
            }
        })
    }
})