// seleção:
const body = document.querySelector("#body")

const saldoOption = document.querySelector("#saldoOption");

const actualValue = document.querySelector("#actualValue");

const limitValue = document.querySelector("#limitValue");

const checkInBtn = document.querySelector("#checkIn");

const checkOutBtn = document.querySelector("#checkOut");

const inInput = document.querySelector("#inInput");

const outInput = document.querySelector("#outInput");

const extractContainer = document.querySelector("#extractContainer");


//pegar data e hora atual:
// Obtém a data e hora atual
var dataAtual = new Date();

// Formata a data para o formato "dd/mm/aaaa"
var dataFormatada = dataAtual.getDate() + '/' + (dataAtual.getMonth() + 1) + '/' + dataAtual.getFullYear();

// Formata a hora para o formato "hh:mm:ss"
var horaFormatada = dataAtual.getHours() + ':' + dataAtual.getMinutes() + ':' + dataAtual.getSeconds();

// Cria uma string combinando a data e a hora
var dataHoraFormatada = dataFormatada + ' ' + horaFormatada;

// Imprime a data e hora formatada
console.log(dataHoraFormatada);




// Funções:

    //Depositar
    depostiFunction = () =>{
    
    //lançar a notificaçãp:
    if(inInput.value===""){
    notification("Insira um valor", dataFormatada, "#753131");

    }else{
    // converter o valor do span em numero
    const saldoNumber = parseFloat(actualValue.textContent);

    //converter o valor do input em numero
    const valueInput = parseFloat(inInput.value);

    //somar os valores do input e do span atual
    const newSaldo = saldoNumber+valueInput;

    //Atualizar o span  
    actualValue.innerHTML = newSaldo;
    limitValue.innerHTML = newSaldo;
    
    //Notificar a ação
    notification(`Deposito de ${inInput.value}R$ realizado com suceso`, dataFormatada, "#053c30");

    //Criar o extrato
    createExtract("in-extract","Entrada",inInput.value,dataFormatada)

    //Limpando o input
    inInput.value = "";
    }
}

    //Sacar
    saqueFunction = () =>{
    //lançar a notificaçãp:
    if(outInput.value===""){
        notification("Insira um valor", dataFormatada, "#753131");
    
        }else{

        // converter o valor do span em numero
        const saldoNumber = parseFloat(actualValue.textContent);
    
        //converter o valor do input em numero
        const valueInput = parseFloat(outInput.value);
    
        //somar os valores do input e do span atual
        const newSaldo = saldoNumber-valueInput;
    
        //Atualizar o span  
        actualValue.innerHTML = newSaldo;
        limitValue.innerHTML = newSaldo;
        
        //Notificar a ação
        notification(`Saque de ${outInput.value}R$ realizado com suceso`, dataFormatada, "#753131");
    
        //Criar o extrato
        createExtract("out-extract","Saída",outInput.value,dataFormatada)
    
        //Limpando o input
        outInput.value = "";

    }
}

    //Criar Notificação:
    notification = (ação, date, color)=>{

        const section = document.createElement("section");
        section.id = "notficationContainer";
        section.className = "notification";
        section.setAttribute("data-aos", "fade-left");
        section.style.backgroundColor = color

        const h2 = document.createElement("h2");
        h2.innerHTML = ação;

        const p = document.createElement("p");
        const span = document.createElement("span");
        span.innerHTML = `${date}`;

        //apends
        p.appendChild(span)
        section.append(h2, p)
        body.appendChild(section)

        function removerSection(){
            body.removeChild(section)
        }
        setTimeout(removerSection, 2000)
    }

    //Criar Extrato
    createExtract = (clasName,type,value,date)=>{
        const div = document.createElement("div");
        div.className = clasName;

        const h2 = document.createElement("h2");
        h2.innerHTML = type;

        const p1 = document.createElement("p");
        const span1 = document.createElement("span");
        span1.className = "in-value";
        span1.innerHTML = value +"$";

        const p2 = document.createElement("p");
        const span2 = document.createElement("span");
        
        span2.className = "time-extract";
        span2.innerHTML = date;
        p2.appendChild(span2)
        p1.appendChild(span1)
        
        div.append(h2,p1,p2)
        extractContainer.appendChild(div)

        
    }
//Eventos:
checkInBtn.addEventListener("click" , ()=>{
    depostiFunction();
})

checkOutBtn.addEventListener("click" , ()=>{
    saqueFunction();
})