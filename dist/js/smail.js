const form = document.querySelector('.form');
const inputs = form.querySelectorAll('.field.input input, .field.text textarea');
const checkbox = form.querySelector('.field.checkbox input');
const button = form.querySelector('.button');
const formError = form.querySelector('.buttons .error');
const formMessage = form.querySelector('.buttons .message');

const carts = document.querySelectorAll('.cart-button');
console.log(carts)
carts.forEach(item=>{
    item.addEventListener('click', (e)=>{
        console.log(e.currentTarget)
        const id = e.currentTarget;
    })
})

// Функция для проверки валидности поля
function validateField(input) {
    const field = input.closest('.field');
    if (!input.value.trim()) {
        field.classList.add('error');
        return false;
    } else {
        field.classList.remove('error');
        return true;
    }
}

// Функция для проверки валидности чекбокса
function validateCheckbox(checkbox) {
    const field = checkbox.closest('.field');
    if (!checkbox.checked) {
        field.classList.add('error');
        return false;
    } else {
        field.classList.remove('error');
        return true;
    }
}

// Проверка валидности формы
function validateForm() {
    let isValid = true;
    inputs.forEach(input => {
        isValid = validateField(input) && isValid;
    });
    isValid = validateCheckbox(checkbox) && isValid;
		return isValid
}

// Обработчики событий 'focus' для всех полей ввода
inputs.forEach(input => {
    input.addEventListener('focusout', () => {
        validateField(input);
    });
});

// Обработчик события 'change' для чекбокса
checkbox.addEventListener('change', () => {
    validateCheckbox(checkbox);
});

// Обработчик события 'submit' для формы
form.addEventListener('submit', (event) => {
    event.preventDefault();
	
    // Проверяем, все ли поля валидны
    if (validateForm()) {
        // Отправка формы
        const form  = document.getElementById('formId')
        const data = new FormData(form);
	    console.log('--- new>', data)
        const sending = document.getElementById('sendingId')
        const sended = document.getElementById('sendedId')
        form.style.display = 'none'
        sending.style.display = 'block'
       fetch('/mail', 
		{
            method: 'POST',  
            body: data
        })
        .then(response=> {return response.json()}).then(res=>{
            console.log('res>', res)
			if(res.captcha){
				
				alert('Форма успешно отправлена!');
                sending.style.display = 'none'
                sended.style.display = 'block'
			}else {
                form.style.display = 'block'
                alert('Подтвердите что вы не робот')
                  form.style.display = 'block'
            }
            // Обработка ответа сервера
     
        })
        .catch(error => {
            console.error('Ошибка отправки формы:', error);

        });
    }
});
//https://formspree.io/f/korvinfara@gmail.com
//http://136.243.156.190:9000/mail