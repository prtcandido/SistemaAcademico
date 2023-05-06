function script(){
    const inputButtonTeste = document.getElementById('buttonTeste');
    const inputSidebar = document.getElementById('sidebar')
    inputButtonTeste.addEventListener('click', ()=>{sideBarTests()});
    let buttonActive = false;
    function sideBarTests(){
        const fotoPerfil = document.getElementById('foto-perfil');
        if (buttonActive==false){
            buttonActive = !buttonActive;
            inputSidebar.style.width = '3%';
            inputSidebar.innerHTML = `
            <div style="margin: 0px">
            <div>
                <img style="width: 3.5em; height: 3.5em" id="foto-perfil" src="https://media.licdn.com/dms/image/D4E03AQGUbw7hkjq0rg/profile-displayphoto-shrink_800_800/0/1670509950722?e=1687996800&v=beta&t=f1Kmrwy4b9Zp4PDXG5QrS8Q9IzbHHq9ig1Dp2GTwd9c" alt="Foto de perfil">
            </div>
            </div>`
        }else{
            inputSidebar.style.padding = '20px';
            inputSidebar.style.width = '20%';
            buttonActive = !buttonActive
            setTimeout(() => {
                inputSidebar.innerHTML = `
            <div id="perfil-info">
                <div>
                    <img style="width:8em; height:8em;" id="foto-perfil" src="https://media.licdn.com/dms/image/D4E03AQGUbw7hkjq0rg/profile-displayphoto-shrink_800_800/0/1670509950722?e=1687996800&v=beta&t=f1Kmrwy4b9Zp4PDXG5QrS8Q9IzbHHq9ig1Dp2GTwd9c" alt="Foto de perfil">
                </div>
                <div id="aluno-info">
                    <p id="nome-aluno">Victor Principe</p>
                    <div id="maisinfo-aluno">
                        <span>525.3265/02</span> <span style="color: rgb(130, 28, 225);">/RA</span>
                        <p> <span style="color: rgb(130, 28, 225);"> 3º </span>Ciclo</p>
                        <p id="email-aluno">victorprincipe@fatec.sp.gov.br</p>
                    </div>
                </div>
            </div>`       
            }, 300);
            
        }

    }





} // Dom