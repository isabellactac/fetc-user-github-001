const form = document.querySelector("form") //o queryselector pega o form
const inputUser = document.querySelector("#name") //pega o input do name
const userImg = document.querySelector("#user-img")
const userName = document.getElementById("user-name")
const userContainer = document.getElementById("container-user")
const userError = document.querySelector("#message-error")


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try{
        console.log(inputUser.value)
        // fetch serve para buscar conteúdo externo
        const res = await fetch(`https://api.github.com/users/${inputUser.value}`)
        const data = await res.json() //converte em formato json que o javascript aceita
        if(data.message === "Not found"){
            throw Error ("Usuário não encontrado")
        }
        localStorage.setItem("github-user", inputUser.value)
        userError.style.display = "none"
        //altera o atributo src da img
        userImg.src = data.avatar_url
        //altera o atributo alt da img
        userImg.alt = data.name
        //altera o conteúd da tag span
        userName.innerText = data.name
        userContainer.style.display = "flex"
        console.log(data)
    } catch (error){
        userContainer.style.display = "none"
        userError.style.display = "block"
    }
})
window.onload = () => {
    const githubUser = localStorage.getItem("github-user")
    inputUser.value = githubUser
}


//localStorage.setItem("chave", "valor") //cria havriável em cache e insere seu valor
//cosole.log(localStorage.getItem("chave")) //pega a variável
//localStorage.removeItem("chave") //remove a variável