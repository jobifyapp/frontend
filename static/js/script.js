// JOBIFY.JS 1.0 February 2024 by Emerson Reinhard //

const modals = document.getElementsByClassName('modalWrapper')

const contactmodal = document.getElementById('contactModal')
const contactquestion = document.getElementById('contactQuestion')
const contactmeeting = document.getElementById('contactMeeting')
const contactmental = document.getElementById('contactMental')
const contactrelationship = document.getElementById('contactRelationship')
const contactbusiness = document.getElementById('contactBusiness')
const contacttip = document.getElementById('contactTip')
const postlisting = document.getElementById('postModal')

window.onclick = function(event) {
    for (let modal of modals) {
        if (event.target == modal) {
            event.target.classList.add('hidden')
            if (event.target.id === 'applied') {
                window.location.href = `/listings`
            }
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
    const articleopen = document.getElementById('postarticle')
    const articlemodal = document.getElementById('postArticleModal')

    articleopen.addEventListener('click', () => {
        articlemodal.classList.remove('hidden')
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const contactopen = document.getElementById('contact-open')
    const contactmodal = document.getElementById('contactModal')

    if (contactopen) {
        contactopen.addEventListener('click', () => {
            contactmodal.classList.remove('hidden')
        })
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const contactopenhero = document.getElementById('contact-open-hero')

    contactopenhero.addEventListener('click', () => {
        contactmodal.classList.remove('hidden')
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const contactquestion = document.getElementById('contactQuestion')
    const optionquestion = document.getElementById('question')

    optionquestion.addEventListener('click', () => {
        contactmodal.classList.add('hidden')
        contactquestion.classList.remove('hidden')
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const contactmeeting = document.getElementById('contactMeeting')
    const contactmental = document.getElementById('contactMental')
    const contactrelationship = document.getElementById('contactRelationship')
    const contactbusiness = document.getElementById('contactBusiness')
    const contacttip = document.getElementById('contactTip')

    const optionmeeting = document.getElementById('arrangeMeeting')
    const optionmental = document.getElementById('mentalHealth')
    const optionrelationship = document.getElementById('relationshipCounseling')
    const optionbusiness = document.getElementById('businessInquiry')
    const optiontip = document.getElementById('tipLine')

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

    const navregister = document.getElementById('navregister')
    const navlogin = document.getElementById('navlogin')

    navregister.addEventListener('click', () => {
        window.location.href = '/register'
    })

    navlogin.addEventListener('click', () => {
        window.location.href = '/login'
    })

    const approvelisting = document.getElementById('approve')
    const deletelisting = document.getElementById('delete')
})

document.addEventListener('DOMContentLoaded', () => {
    const applybutton = document.getElementById('applyJob')
    const messagemodal = document.getElementById('leaveAMessageApply')
    const messageform = document.getElementById('messageModalApply')

    applybutton.addEventListener('click', () => {
        messagemodal.classList.remove('hidden')
    })

    messageform.addEventListener('submit', async (e) => {
        e.preventDefault()
        var currentURL = (document.URL)
        const applicant = parseInt(document.cookie.match(new RegExp('(^| )' + `id` + '=([^;]+)'))[2])
        const listing = parseInt(currentURL.split("/")[4])
        const message = document.getElementById('applicationmessage').value

        const response = await fetch('/newapplication', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ applicant, listing, message })
        })

        if (response.ok) {
            const confirmmodal = document.getElementById('applied')
            messagemodal.classList.add('hidden')
            confirmmodal.classList.remove('hidden')
        } else {
            console.error('Applying error:', data.error)
        }
    })
})

// Extracted from listings.js //

const postform = document.getElementById('postModalForm')

async function openPostModal () {
    postlisting.classList.remove('hidden')
}

async function approveListing () {
        console.log('PRESSED')
        var currentURL = (document.URL);
        var id = parseInt(currentURL.split("/")[5])
        const response = await fetch('/approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
    
        const data = await response.json()
        if (response.ok) {
            window.location.href = `/console/listings`
        } else {
            alert(data.error)
        }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const registerform = document.getElementById('register')

    registerform.addEventListener('submit', async (e) => {
        console.log(`REGISTERED`)
        e.preventDefault()

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const first = document.getElementById('first').value
        const middle = document.getElementById('middle').value
        const last = document.getElementById('last').value
        const phone = document.getElementById('phone').value
        const dob = document.getElementById('dob').value
        const icon = document.getElementById('avatar').value
        const type = document.querySelector('input[name="t"]:checked')?.value

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email, password, first, middle, last, phone, dob, icon, type
                })
            })

            const data = await response.json()

            if (response.ok && data.token) {
                localStorage.setItem('authToken', data.token)
                localStorage.setItem('user', JSON.stringify(data.userinfo))
                document.cookie = `id=${data.userinfo.id}`
                document.cookie = `type=${data.userinfo.type}`
                window.location.href = `/`
                
            } else {
                console.error('Registration error:', data.error)
            }
        } catch (err) {
            console.error('Fetch error:', err)
        }
    })
})

document.addEventListener('DOMContentLoaded', (event) => {
    const loginform = document.getElementById('loginform')

    if (loginform) {
        console.log('Form found');
    loginform.addEventListener('submit', async (e) => {
        console.log('LOGGING IN')
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.status === 200) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.userinfo))
                document.cookie = `id=${data.userinfo.id}`
                document.cookie = `type=${data.userinfo.type}`
                window.location.href = '/';
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Login error:', error)
            alert('Failed to login. Please try again')
        }
    })
    }
})

document.addEventListener('DOMContentLoaded', (event) => {
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
        const employer = document.cookie.match(new RegExp('(^| )' + `id` + '=([^;]+)'))[2]

        const response = await fetch('/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, icon, location, salary, description, arrangements, requirements, skills, responsibilities, benefits, employer })
        })

        const data = await response.json()
        if (response.ok) {
            const confirmation = document.getElementById('postConfirmation')
            const postmodal = document.getElementById('postModal')
            confirmation.classList.remove('hidden')
            postmodal.classList.add('hidden')
        } else {
            alert(data.error)
        }
    })
})

document.addEventListener('DOMContentLoaded', (event) => {
    postArticleForm = document.getElementById('postArticleModalForm')
    postArticleForm.addEventListener('submit', async (e) => {
        console.log(`POSTED ARTICLE`)
        e.preventDefault()
        const name = document.getElementById('articlename').value
        const text = document.getElementById('articletext').value
        const id = document.cookie.match(new RegExp('(^| )' + `id` + '=([^;]+)'))[2]
        console.log(id)
        const path = name.toLowerCase().replace(/\s+/g, '-')

        const response = await fetch('/postarticle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, text, path })
        })

        const data = await response.json()
        if (response.ok) {
            window.location.href = `/resources/${path}`
        } else {
            alert(data.error)
        }
    })
})

const updateportfolioform = document.getElementById('creatingportfolio')

document.addEventListener('DOMContentLoaded', (event) => {
    updateportfolioform.addEventListener('submit', async (e) => {
        e.preventDefault()
        const id = document.cookie.match(new RegExp('(^| )' + `id` + '=([^;]+)'))[2]
        const about = document.getElementById('about').value
        const experience = document.getElementById('experience').value
        const education = document.getElementById('education').value
        const skills = document.getElementById('skills').value
        const achievements = document.getElementById('achievements').value

        const response = await fetch('/createportfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, about, experience, education, skills, achievements })
        })

        if (response.ok) {
            window.location.reload()
        }
    })
})

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DROPDWON PRESSED')
    const token = localStorage.getItem('authToken');

    const postBtn = document.getElementById('post')
    const contactBtn = document.getElementById('contact-open')
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const userDropdown = document.getElementById('dropdown');
    const userNameSpan = document.getElementById('username');
    const portfolioBtn = document.getElementById('portfoliobtn')
    const logoutBtn = document.getElementById('logoutbtn');

    if (postBtn) {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user.type === 1) {
            post.remove()
        }
    }

    if (token) {
        const user = JSON.parse(localStorage.getItem('user'))
        const avatar = user.avatar
        const id = user.id
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';

        if (user.type === 3) {
            contactBtn.textContent = 'Console'
            contactBtn.addEventListener('click', () => {
                window.location.href = '/console'
            })
        }

        userDropdown.classList.remove('hidden');

        userNameSpan.textContent = `${user.first} ${user.last.charAt(0)}.`;
        document.querySelector('.avatar').src = avatar;

        const toggle = document.getElementById('usertoggle');
        const dropdown = document.getElementById('dropdown');
        toggle.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });

        const response = await fetch('/searchportfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })

        portfolioBtn.href = `/portfolio/${user.id}`

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            window.location.reload();
        });
    }
});

async function fetchTickets() {
    console.log('FETCHING TICKETS')
    const response = await fetch('/searchtickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    })

    const data = await response.json()

    const tickets = data.tickets

    if (tickets.length == 0) {
        return
    }

    const emojis = ['⁉️', '📆', '🫂', '❤️', '💼', '🕶️']
    const types = ['Question', 'Arrange Meeting', 'Mental Health Support', 'Relationship Counseling', 'Business Inquiry', 'Tip Line']

    const container = document.getElementById('options')
    container.innerHTML = ''

    tickets.forEach(ticket => {
        console.log(ticket)
        const parent = document.createElement('div')
        const option = document.createElement('div')
        option.classList.add('option')
        const splash = document.createElement('div')
        splash.classList.add('splash')
        const icon = document.createElement('span')
        icon.classList.add('icon')
        icon.textContent = emojis[ticket.type]
        splash.appendChild(icon)
        option.appendChild(splash)
        const info = document.createElement('div')
        info.classList.add('info')
        const details = document.createElement('div')
        details.classList.add('details')
        const name = document.createElement('h3')
        name.classList.add('name')
        name.textContent = types[ticket.type]
        details.appendChild(name)
        const blurb = document.createElement('div')
        blurb.classList.add('blurb')
        blurb.textContent = ticket.name
        details.appendChild(blurb)
        info.appendChild(details)
        const open = document.createElement('button')
        open.classList.add('open')
        open.onclick = () => {
            // GENERATE MODAL
        }
        const apply = document.createElement('div')
        apply.classList.add('apply')
        const btntext = document.createElement('span')
        btntext.textContent = 'Manage'
        apply.appendChild(btntext)
        open.appendChild(apply)
        info.appendChild(open)
        option.appendChild(info)
        parent.appendChild(option)
        container.appendChild(parent)
    })
}

// ticket submission here

async function fetchJobs() {
    const response = await fetch('/searchjobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  })
    })
    
    const data = await response.json()

    const listings = data.listings
    
    if (listings.length == 0) {
        return
    }

    const type = parseInt(document.cookie.match(new RegExp('(^| )' + `type` + '=([^;]+)'))[2])
    const id = parseInt(document.cookie.match(new RegExp('(^| )' + `id` + '=([^;]+)'))[2])
    console.log(typeof type, type)
    const header = document.getElementById('header')

    if (type === 2 || type === 3) {
        header.textContent = 'Select one of your job postings'
    } else {
        header.textContent = 'Select one of your applications'
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
            if (type === 2 || type === 3) {
                window.location.href = `/jobs/${listing.id}`
            } else {
                window.location.href = `/applications/${listing.id}/${id}`
            }
        }
        const apply = document.createElement('div')
        apply.classList.add('apply')
        const btntext = document.createElement('span')
        btntext.href = `/listing/${listing.id}`
        btntext.textContent = 'View'
        apply.appendChild(btntext)
        open.appendChild(apply)
        info.appendChild(open)
        option.appendChild(info)
        parent.appendChild(option)
        container.appendChild(parent)
    })
}

async function fetchApplications(id) {
    const response = await fetch('/searchapplications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })

    const data = await response.json()

    const applications = data.applications

    if (applications.length == 0) {
        return
    }

    const container = document.getElementById('options')
    container.innerHTML = ''

    applications.forEach(application => {
        const parent = document.createElement('div')
        const option = document.createElement('div')
        option.classList.add('option')
        const splash = document.createElement('div')
        splash.classList.add('splash')
        const background = document.createElement('div')
        background.classList.add('background')
        background.style.background = `url('${application.icon}') center center / cover no-repeat`
        splash.appendChild(background)
        const icon = document.createElement('img')
        icon.classList.add('icon')
        icon.src = application.icon
        splash.appendChild(icon)
        option.appendChild(splash)
        const info = document.createElement('div')
        info.classList.add('info')
        const details = document.createElement('div')
        details.classList.add('details')
        const name = document.createElement('h3')
        name.classList.add('name')
        name.textContent = application.name
        details.appendChild(name)
        //const city = document.createElement('div')
        //city.classList.add('city')
        //city.textContent = listing.location
        //details.appendChild(city)
        info.appendChild(details)
        const open = document.createElement('button')
        open.classList.add('open')
        open.onclick = () => {
            window.location.href = `/applications/${(document.URL).split("/")[4]}/${application.id}`
        }
        const apply = document.createElement('div')
        apply.classList.add('apply')
        const btntext = document.createElement('span')
        btntext.href = `/applications/${(document.URL).split("/")[4]}/${application.id}`
        btntext.textContent = 'View'
        apply.appendChild(btntext)
        open.appendChild(apply)
        info.appendChild(open)
        option.appendChild(info)
        parent.appendChild(option)
        container.appendChild(parent)
    })
    console.log(`FETCHING COMPLETE`)
}

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