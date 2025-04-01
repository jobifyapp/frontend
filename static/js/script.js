// JOBIFY.JS 1.0 February 2024 by Emerson Reinhard //

const modals = document.getElementsByClassName('modalWrapper')

const contactquestion = document.getElementById('contactQuestion')
const contactmeeting = document.getElementById('contactMeeting')
const contactmental = document.getElementById('contactMental')
const contactrelationship = document.getElementById('contactRelationship')
const contactbusiness = document.getElementById('contactBusiness')
const contacttip = document.getElementById('contactTip')

window.onclick = function(event) {
    console.log(`window.onclick function called`)
    console.log(event.target)

    for (let modal of modals) {
        if (event.target == modal) {
            contactmodal.classList.add('hidden')
            contactquestion.classList.add('hidden')
            contactmeeting.classList.add('hidden')
            contactmental.classList.add('hidden')
            contactrelationship.classList.add('hidden')
            contactbusiness.classList.add('hidden')
            contacttip.classList.add('hidden')
        }
    }
}

const contactopen = document.getElementById('contact-open')
const contactmodal = document.getElementById('contactModal')

contactopen.addEventListener('click', () => {
    contactmodal.classList.remove('hidden')
})

const optionquestion = document.getElementById('question')
const optionmeeting = document.getElementById('arrangeMeeting')
const optionmental = document.getElementById('mentalHealth')
const optionrelationship = document.getElementById('relationshipCounseling')
const optionbusiness = document.getElementById('businessInquiry')
const optiontip = document.getElementById('tipLine')

optionquestion.addEventListener('click', () => {
    contactmodal.classList.add('hidden')
    contactquestion.classList.remove('hidden')
})

optionmeeting.addEventListener('click', () => {
    contactmodal.classList.add('hidden')
    contactmeeting.classList.remove('hidden')
})

optionmental.addEventListener('click', () => {
    contactmodal.classList.add('hidden')
    contactmental.classList.remove('hidden')
})

optionrelationship.addEventListener('click', () => {
    contactmodal.classList.add('hidden')
    contactrelationship.classList.remove('hidden')
})

optionbusiness.addEventListener('click', () => {
    contactmodal.classList.add('hidden')
    contactbusiness.classList.remove('hidden')
})

optiontip.addEventListener('click', () => {
    contactmodal.classList.add('hidden')
    contacttip.classList.remove('hidden')
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