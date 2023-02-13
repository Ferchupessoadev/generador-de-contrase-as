addEventListener("DOMContentLoaded", ()=>{
    const copyBtn = document.querySelector(".copy-btn");
    const createPasswordBtn = document.querySelector(".container-caracteres");
    const showPasswordHTML = document.querySelector(".password-text");
    const copiedCheck = document.querySelector(".password-copied");
    const caracters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$[]%&*_{}+-=()'?";
   
    const generatePassword = numOfChar => {
	let newPassword = "";
	for(let i = 1;i <= numOfChar;i++){
	    newPassword += caracters.charAt(Math.floor(Math.random()*caracters.length));
	}
	if(newPassword.length < 12 || newPassword == undefined || newPassword == null) generatePassword(numOfChar);
	else return newPassword;
    }

    const showPassword = (newPassword)=> {
	showPasswordHTML.innerHTML = newPassword;
    }


    //esta funcion copia al portapeles la contrasenia con un solo click sin tener que seleccionar, apretar click derecho y darle en copiar.
    const copyToClipboard = async text => {
	try {
	    await navigator.clipboard.writeText(text);
	    copyBtn.classList.add("hide-copy-btn");
	    copiedCheck.classList.add("copied");
	    setTimeout(()=>{
		copyBtn.classList.remove("hide-copy-btn");
		copiedCheck.classList.remove("copied");
	    },1200)
	} catch (err) {
	    console.error('No se pudo copiar el texto: ', err);
	}
    }

    const showPosterCopy = ()=>{
	const posterCopy = document.querySelector(".container-msg-copy");
	posterCopy.style.display = "flex";
	posterCopy.style.bottom = `${copyBtn.getBoundingClientRect().bottom}px`;
	posterCopy.style.bottom = `${copyBtn.getBoundingClientRect().top}px`;
	posterCopy.style.right = `${copyBtn.getBoundingClientRect().right}px`;
	posterCopy.style.left = `${copyBtn.getBoundingClientRect().left}px`;
	posterCopy.style.transform = `translate(0,30px)`;
    }
    copyBtn.addEventListener("click",()=>copyToClipboard(showPasswordHTML.textContent));

    copyBtn.addEventListener("mouseover", ()=>{
	showPosterCopy();	
    });
    copyBtn.addEventListener("mouseleave", ()=>{
	const posterCopy = document.querySelector(".container-msg-copy");
	posterCopy.style.display = "none";
    })

    createPasswordBtn.addEventListener("click", e => {
	if (e.target.className == "caracteres-p" || e.target.className == "caracteres") {
	    let numCharOfThePassword;
	    (e.target.className == "caracteres-p") ? numCharOfThePassword = e.target.innerHTML : numCharOfThePassword = e.target.firstElementChild.textContent;
	    let newPassword = generatePassword(numCharOfThePassword);
	    showPassword(newPassword);
	}
    });

})


