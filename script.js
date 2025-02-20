const APIURL = 'https://api.github.com/users/'
const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')
//brad traversy
async function  getData(username){
    try{
        const {data}=await axios.get(APIURL+username)
        createCard(data)
        getRepos(username)
    }
    catch(err){
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }
}
async function  getRepos(username){
    try{
        const {data}=await axios.get(APIURL+username+'/repos?sort=created')
        addReposToCard(data)
    }
    catch(err){
        if(err.response.status == 404) {
            createErrorCard('problem fetching repos')
        }
    }
}
function createCard(user){
    const cardHTML=`
           <div class="card">
            <div >
            <img class="avatar" src="${user.avatar_url}" alt="">
        </div>
        <div class="user-info">
            <h3>${user.name}</h3>
            <p>${user.bio} </p>
            <ul>
                <li>${user.followers}<strong>followers</strong></li>
                <li>${user.following}<strong>following</strong></li>
                <li>${user.public_repos}<strong>repos</strong></li>
            </ul>
            <div id="repos">
             </div>
        </div>
     
        </div>`
        main.innerHTML=cardHTML
}
function createErrorCard(msg){
    const cardHTML=`<div class="card">
    <h1>${msg}</h1></div>`
    main.innerHTML=cardHTML
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const user=search.value
    if(user){
        getData(user)
        search.value=''
    //    main.innerHTML=``
    }
})
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos.slice(0, 5).forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}