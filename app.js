////// Fetch api
const apiBaseUrl = `https://api.github.com/users`;
////// selected element////
const input_area = document.querySelector('.input');
const container_warper = document.querySelector('.container_warper');

///////error msg function
const erromsg = (status) => {
    const Error = document.querySelector('.Error');
    let errmsg = ` `;
    if(status === 404){
        errmsg = `<p class="errorText">Profile doesn't exist! Enter valid username</p>`
    }
    Error.innerHTML = errmsg;
    setTimeout(() =>   Error.innerHTML = ` `,  5000)
}

/////// Git hub profile api///////
const getGitHubProfile = async (login) => {
    try{
        const response = await fetch(`${apiBaseUrl}/${login}`);
        if(response.status !== 200){
            if(response.status === 404){
                erromsg(response.status)
            }
            new Error(`something want wrong! Status code : ${response.status}`)
        }
        const data =await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

///////// git repos api ///////
const getGitHubRepos = async (login) => {
    try{
        const response = await fetch(`${apiBaseUrl}/${login}/repos`);
        if(response.status !== 200){
            if(response.status === 404){
                erromsg(response.status)
            }
            new Error(`something want wrong! Status code : ${response.status}`)
        }
        const data =await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

///////////===== Profile render ======//////
const profileRender = (data) => {
    const user_side = document.querySelector('.user_side');
    let profileHtml = ``;
    profileHtml += `
            <div class="img">
              <img
                src="${data.avatar_url}"
                alt="image"
              />
            </div>
            <div class="names">
              <div class="name">${data.name}</div>
              <div class="user_name">${data.login}</div>
            </div>`
        if(data.bio !==null){
        profileHtml += ` <div class="bio">
              <p class="bio_text">
                ${data.bio}
              </p>
            </div>`
        }
        profileHtml += `  <div class="follow">
              <div class="followers">
                <a href="#"
                  ><i class="fa-solid fa-user-group"></i><span>${data.followers}</span
                  ><span class="te">followers  </span></a
                >
              </div>
              <div class="following">
                <a href="#">
                  <span>  </span>.<span>${data.following}</span><span class="te">following</span></a
                >
              </div>
            </div>
    `
    user_side.innerHTML = profileHtml;

}

///////////===== repos render ======//////
const reposRender = (datas) => {
    const items = document.querySelector('.items');
    let repos = ``;
    if(datas.length > 0){
        datas.map((data) => {
            repos +=`
        <div class="item">
        <div class="repo_name">
          <div class="icon">
            <i class="fa-solid fa-book-bookmark"></i>
          </div>
          <div class="title"><a target="_blank" href="${data.html_url}">${data.name} </a></div>
          <div class="security">
            <span class="text">${data.visibility}</span>
          </div>
        </div>
        <div class="about_repo">
          <span>${data.description !== null? data.description : ``}</span>
        </div>
        <div class="environment">
          <div class="langues">
            <div class="style ${data.language ? data.language.toLowerCase() : ''} "></div>
            <span class="langues_title "> ${data.language !==null? data.language : ''} </span>
          </div>
          <div class="stars">
            <i class="fa-solid fa-star"></i><span>${data.stargazers_count}</span>
          </div>
          <div class="share">
            <i class="fa-solid fa-share-nodes"></i><span>${data.watchers_count}</span>
          </div>
        </div>
      </div>
        `
        })
    }
        
console.log('kkk');
    items.innerHTML = repos;
}
///// Document Load
document.addEventListener('DOMContentLoaded', () => {
////// Get user input
const input = document.querySelector('#input');
const button = document.querySelector('#button');

button.addEventListener('click', async (e) => {
    e.preventDefault();
        const gitUserName = input.value.trim();
        const userProfile = await getGitHubProfile(gitUserName);
        if(userProfile.login){
            input_area.classList.add('active');
            container_warper.classList.add('active');
            const gitRepos = await getGitHubRepos(userProfile.login);
            profileRender(userProfile);
            reposRender(gitRepos)
        }
    
})
});