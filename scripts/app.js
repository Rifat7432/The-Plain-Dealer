const loading = (isLoading) => {
  const spinner = document.getElementById('spinner');
  if(isLoading){
       spinner.classList.remove('d-none')
  }
  else{
      spinner.classList.add('d-none')
  }
}
const loadCategories = async() =>{
    loading(true)
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json();
    displayCategory(data.data.news_category)
}
const displayCategory = (data) =>{
    const categories = document.getElementById('categories');
    data.forEach(category => {
    const div = document.createElement('div')
    div.innerHTML =`
    <button type="button" class="btn btn-light me-2 p-2" onclick="loadNews('${category.category_id}')">${category.category_name}</button>
    `;
    categories.appendChild(div)
  });
  loading(false)
}
const loadNews = async(category_id)=>{
    const newsContainer = document.getElementById('news-container')
    newsContainer.textContent ='';
    loading(true)
    const sortContainer = document.getElementById('sort-container');
    sortContainer.classList.remove('d-none')
    const newsCategoriesURL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(newsCategoriesURL)
    const data = await res.json();
    displayNews(data.data)
}
const displayNews = (newses) => {
    const defaultSort = newses
    const numberOfNews = newses.length
    const span = document.getElementById('number');
    span.innerText = numberOfNews;
    const newsContainer = document.getElementById('news-container')
    newsContainer.textContent ='';
    const sortValue = selectList();
    if(sortValue === 3){
      newses.sort((a,b) => a.total_view-b.total_view);
    }
    else if(sortValue === 2){
     newses.sort((a,b) => a.total_view-b.total_view).reverse();
    }
   else{
     newses = defaultSort
    }
    newses.forEach(news => {
    const {title,details,author,thumbnail_url,total_view,_id} = news;
    const detailsArray = details.split(' ');
    const detailFirstArray = detailsArray.splice(0,35);
    const detailFirst = detailFirstArray.join(' ');
    const detailScendArray = detailsArray.splice(0,25);
    const detailScend = detailScendArray.join(' ');
    const {img,name,published_date} = author;
    const newsCard = document.createElement('div');
    newsCard.classList.add('col');
    newsCard.innerHTML = `
    <div class="card mb-3">
  <div class="row g-0">
    <div class="col-lg-3 col-12 ">
      <img src="${thumbnail_url}" class="img-fluid rounded-start" style="width:100%;" alt="...">
    </div>
    <div class="col-lg-9 col-12">
      <div class="card-body">
        <h5 class="card-title">${title === null ? 'no information' : title}</h5>
        <p class="card-text" >${detailFirst}</p>
        <p class="card-text text-truncate">${detailScend}</p>
        <div class="d-flex justify-content-lg-evenly justify-content-center align-items-center mt-5 flex-column flex-lg-row">
        <div class="d-flex">
           <img class="card-img rounded-circle me-3" style="height:60px; width:60px;" src="${img}" alt="">
           <div>
           <h6>${name === null ? 'no information' : name}</h6>
           <h6>${published_date === null ? 'no information' : published_date}</h6>
           </div>
        </div>
        <div>
        <i class="fa-regular fa-eye"></i>
        <span>${total_view === null ? 'no information' : total_view +''+'M'}</span>
        </div>
        <div>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-solid fa-star-half"></i>
        </div>
        <div>
        <button onclick ="newsModal('${_id}')" type="button" class="btn btn-light text-primary p-2" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
    newsContainer.appendChild(newsCard)
 });
 loading(false)
}
const newsModal = async(newsId) => {
   loading(true);
   const newsUrl =`https://openapi.programming-hero.com/api/news/${newsId}`;
   const res = await fetch(newsUrl)
   const data = await res.json();
   displayNewsModal(data.data[0])
}
const displayNewsModal = (news) =>{
  const {title,image_url,details,author,total_view,rating} = news;
  const {name,published_date,img} = author;
  const {number} = rating;
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.innerText = title === null ? 'no information' : title;
  const modalBody =document.getElementById('modal-body');
  modalBody.innerHTML=`
  <div class="card";">
  <img src="${image_url}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${details === null ? 'no information' : details}</p>
    <img class="card-img rounded-circle me-3" style="height:60px; width:60px;" src="${img}" alt="">
    <p class="card-text">Author name : ${name === null ? 'no information' : name}</p>
    <p class="card-text">Date of published :${published_date === null ? 'no information' : published_date}</p>
    <p class="card-text">views : ${total_view === null ? 'no information' : total_view +''+'M'}</p>
    <p class="card-text">Rating : ${number === null ? 0 : number} <i class="fa-regular fa-star"></i></p>
  </div>
  </div>
  `;
   loading(false)
}
const selectList = () => parseInt(document.getElementById('sort-news').value);
const blog = () => window.location.href = "question.html" ;
const news = () => window.location.href = "index.html" ;
loadCategories()  