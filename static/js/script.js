// JOBIFY.JS 1.0 February 2024 by Emerson Reinhard //

const modals = document.getElementsByClassName('modalWrapper')

const contactquestion = document.getElementById('contactQuestion')
const contactmeeting = document.getElementById('contactMeeting')
const contactmental = document.getElementById('contactMental')
const contactrelationship = document.getElementById('contactRelationship')
const contactbusiness = document.getElementById('contactBusiness')
const contacttip = document.getElementById('contactTip')
const postlisting = document.getElementById('postModal')

window.onclick = function(event) {
    console.log(`window.onclick function called`)
    console.log(event.target)

    for (let modal of modals) {
        console.log(modal)
        if (event.target == modal) {
            event.target.classList.add('hidden')
            //contactmodal.classList.add('hidden');
            //contactquestion.classList.add('hidden');
            //contactmeeting.classList.add('hidden');
            //contactmental.classList.add('hidden');
            //contactrelationship.classList.add('hidden');
            //contactbusiness.classList.add('hidden');
            //contacttip.classList.add('hidden');
            //postlisting.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

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

    const postopen = document.getElementById('post')

    postopen.addEventListener('click', () => {
        postlisting.classList.remove('hidden')
    })

    const cookieclose = document.getElementById('cookies-close')
    const cookiebanner = document.getElementById('cookies')

    cookieclose.addEventListener('click', () => {
        cookiebanner.remove()
    })

    const navregister = document.getElementById('navregister')
    const navlogin = document.getElementById('navlogin')

    navregister.addEventListener('click', () => {
        window.location.href = '/register'
    })

    navlogin.addEventListener('click', () => {
        window.location.href = '/login'
    })
})

// Extracted from listings.js //

const postform = document.getElementById('postModalForm')

postform.addEventListener('submit', async (e) => {
    console.log(`POSTED`)
    e.preventDefault()
    const name = document.getElementById('postname').value
    const icon = document.getElementById('posticon').value
    const location = document.getElementById('postlocation').value
    const salary = document.getElementById('postsalary').value
    const arrangements = 'Part-time'
    const description = document.getElementById('postdescription').value
    const requirements = document.getElementById('postrequirements').value
    const skills = document.getElementById('postskills').value
    const responsibilities = document.getElementById('postresponsibilities').value
    const benefits = document.getElementById('postbenefits').value

    const response = await fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon, location, salary, description, arrangements, requirements, skills, responsibilities, benefits })
    })

    const data = await response.json()
    if (response.ok) {
        alert(`Posted listing with ID: ${data.id}`)
        window.location.href = `/listings/${data.id}`
    } else {
        alert(data.error)
    }
})



async function fetchListings(tags = []) {
    if (!tags) {
        tags = ''
    }

    const response = await fetch('/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags })
    })
    
    const data = await response.json()
    console.log(data)

    const listings = data.listings
    
    if (listings.length == 0) {
        return
    }

    const container = document.getElementById('options')
    container.innerHTML = ''

    listings.forEach(listing => {
        const parent = document.createElement('div')
        const option = document.createElement('div')
        option.classList.add('option')
        const splash = document.createElement('div')
        splash.classList.add('splash')
        const background = document.createElement('div')
        background.classList.add('background')
        background.style.background = `url('${listing.icon}') center center / cover no-repeat`
        splash.appendChild(background)
        const icon = document.createElement('img')
        icon.classList.add('icon')
        icon.src = listing.icon
        splash.appendChild(icon)
        option.appendChild(splash)
        const info = document.createElement('div')
        info.classList.add('info')
        const details = document.createElement('div')
        details.classList.add('details')
        const name = document.createElement('h3')
        name.classList.add('name')
        name.textContent = listing.name
        details.appendChild(name)
        const city = document.createElement('div')
        city.classList.add('city')
        city.textContent = listing.location
        details.appendChild(city)
        info.appendChild(details)
        const open = document.createElement('button')
        open.classList.add('open')
        open.onclick = () => {
            window.location.href = `/listings/${listing.id}`
        }
        const apply = document.createElement('div')
        apply.classList.add('apply')
        const btntext = document.createElement('span')
        btntext.href = `/listing/${listing.id}`
        btntext.textContent = 'Apply'
        apply.appendChild(btntext)
        open.appendChild(apply)
        info.appendChild(open)
        option.appendChild(info)
        parent.appendChild(option)
        container.appendChild(parent)
    })
}

async function fetchListingsForReview() {
    const response = await fetch('/searchraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  })
    })
    
    const data = await response.json()
    console.log(data)

    const listings = data.listings
    
    if (listings.length == 0) {
        return
    }

    const container = document.getElementById('options')
    container.innerHTML = ''

    listings.forEach(listing => {
        const parent = document.createElement('div')
        const option = document.createElement('div')
        option.classList.add('option')
        const splash = document.createElement('div')
        splash.classList.add('splash')
        const background = document.createElement('div')
        background.classList.add('background')
        background.style.background = `url('${listing.icon}') center center / cover no-repeat`
        splash.appendChild(background)
        const icon = document.createElement('img')
        icon.classList.add('icon')
        icon.src = listing.icon
        splash.appendChild(icon)
        option.appendChild(splash)
        const info = document.createElement('div')
        info.classList.add('info')
        const details = document.createElement('div')
        details.classList.add('details')
        const name = document.createElement('h3')
        name.classList.add('name')
        name.textContent = listing.name
        details.appendChild(name)
        const city = document.createElement('div')
        city.classList.add('city')
        city.textContent = listing.location
        details.appendChild(city)
        info.appendChild(details)
        const open = document.createElement('button')
        open.classList.add('open')
        open.onclick = () => {
            window.location.href = `http://localhost:3000/console/listings/${listing.id}`
        }
        const apply = document.createElement('div')
        apply.classList.add('apply')
        const btntext = document.createElement('span')
        btntext.href = `console/listing/${listing.id}`
        btntext.textContent = 'Review'
        apply.appendChild(btntext)
        open.appendChild(apply)
        info.appendChild(open)
        option.appendChild(info)
        parent.appendChild(option)
        container.appendChild(parent)
    })
}

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