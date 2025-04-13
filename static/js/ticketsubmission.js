document.addEventListener('DOMContentLoaded', async () => {
    const wrappers = document.querySelectorAll('.modalWrapper form')

    wrappers.forEach((form) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault()

            const formData = {}
            const inputs = form.querySelectorAll('input, textarea')

            inputs.forEach((input) => {
                if (input.id) {
                    formData[input.id] = input.value
                }
            })
            const type = form.closest('.modalWrapper').id
            const ticketee = document.cookie.match(new RegExp('(^| )' + `id` + '=([^;]+)'))[2]
            const name = formData.name
            const email = formData.email || 'Anonymous'
            const subject = formData.subject
            const message = formData.message
            const date = formData.date || undefined
            const others = formData.others || undefined

            const types = { 
                contactQuestion: 1, 
                contactMeeting: 2, 
                contactMental: 3,
                contactRelationship: 4,
                contactBusiness: 5,
                contactTip: 6
            };
              
            const typeNumber = types[type];
              
            const response = await fetch('/createticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { ticketee, email, subject, message, name, date, others, typeNumber } )
            })

            if (response.ok) {
                const confirmation = document.getElementById('ticketSubmission')
                form.closest('.modalWrapper').classList.add('hidden')
                confirmation.classList.remove('hidden')
            }
        })
    })
})