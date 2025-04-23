import { initialTours, initialAdmins } from "/data.js";

let table_category = 'tours';

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return hashHex;
}

async function initTours(tours) {
    const info_box = document.getElementById('info')
    info_box.innerHTML = `<th>ID</th>
                    <th>Страна</th>
                    <th>Город</th>
                    <th>Категория</th>
                    <th>Изображение</th>
                    <th>Описание</th>
                    <th>Действия</th>`;
    tours.forEach(tour=>{
        const tour_info=document.createElement('tr')
        const tour_id = document.createElement('td')
        tour_id.textContent=tour.id
        const tour_country = document.createElement('td')
        tour_country.textContent=tour.country
        const tour_city= document.createElement('td')
        tour_city.textContent=tour.city
        const tour_category = document.createElement('td')
        tour_category.textContent=tour.category
        const tour_img_td= document.createElement('td')
        const tour_img= document.createElement('img')
        tour_img.src=tour.img
        const tour_description = document.createElement('td')
        tour_description.textContent=tour.description
        const tour_button_td = document.createElement('td')
        const tour_button_edit = document.createElement('button')
        tour_button_edit.textContent='Редактировать'
        tour_button_edit.id='tour_edit'
        const tour_button_delete = document.createElement('button')
        tour_button_delete.textContent='Удалить'
        tour_button_delete.id='tour_delete'

        tour_img_td.append(tour_img)

        tour_button_td.append(tour_button_edit, tour_button_delete)

        tour_info.append(tour_id, tour_country, tour_city, tour_category, tour_img_td, tour_description, tour_button_td)

        info_box.append(tour_info)

        tour_button_delete.addEventListener('click', function() {
            tr_delete(tour.id, 'tours');
        });
        tour_button_edit.addEventListener('click', function() {
            showEditForm(tour.id, 'tours');
        });
    })
}
async function initAdmins(admins) {
    const info_box = document.getElementById('info')
    info_box.innerHTML = `<th>ID</th>
                    <th>Логин</th>
                    <th>Пароль</th>
                    <th>Действия</th>`;
    admins.forEach(admin=>{
        const admin_info=document.createElement('tr')
        const admin_id = document.createElement('td')
        admin_id.textContent=admin.id
        const admin_login = document.createElement('td')
        admin_login.textContent=admin.login
        const admin_password= document.createElement('td')
        admin_password.textContent=admin.password
        
        const admin_button_td = document.createElement('td')
        const admin_button_delete = document.createElement('button')
        admin_button_delete.textContent='Удалить'
        admin_button_delete.id='admin_delete'

        admin_button_td.append(admin_button_delete)

        admin_info.append(admin_id, admin_login, admin_password, admin_button_td)

        info_box.append(admin_info)

        admin_button_delete.addEventListener('click', function() {
            tr_delete(admin.id, 'admins');
        });
    })
}

const showTours = document.getElementById('tour_button')
showTours.addEventListener('click', function(){
    table_category = 'tours';
    initTours(initialTours)

    const addForm = document.getElementById('add_form')
    const editForm = document.getElementById('tourEdit_form');
    const container = document.querySelector('.container');
    const addNew = document.getElementById('add_button')
    addNew.disabled=false

    container.remove(addForm, editForm);
})
const showAdmins = document.getElementById('admin_button')
showAdmins.addEventListener('click', function(){
    table_category = 'admins';
    initAdmins(initialAdmins)

    const addForm = document.getElementById('add_form')
    const editForm = document.getElementById('tourEdit_form');
    const container = document.querySelector('.container');
    const addNew = document.getElementById('add_button')
    addNew.disabled=false

    container.remove(addForm, editForm);
})
async function tr_delete(tr_Id, tr_table) {
    try {
        const confirmation = confirm("Вы уверены, что хотите удалить эту запись?");

        if (confirmation && tr_table=='tours') {

            const index = initialTours.findIndex(tour => tour.id === tr_Id);
            if (index !== -1) {
                initialTours.splice(index, 1);
                initTours(initialTours);
            }
        } else if(confirmation && tr_table=='admins'){
            const index = initialAdmins.findIndex(admin => admin.id === tr_Id);
            if (index !== -1) {
                initialAdmins.splice(index, 1);
                initAdmins(initialAdmins);
            }
        }   
    } catch (error) {
        console.error('Ошибка удаления тура:', error);
    }
}

initTours(initialTours);


const addNew = document.getElementById('add_button')
addNew.addEventListener('click', function(){
    addNew.disabled=true
    const addForm =document.createElement('form')
    addForm.id = 'add_form'
    if (table_category == 'tours'){
        addForm.innerHTML = `
        <h2>Добавить новый тур</h2>
        <label for="newTourCountry">Страна:</label>
        <input type="text" id="newTourCountry" name="newTourCountry" required><br><br>

        <label for="newTourCity">Город:</label>
        <input type="text" id="newTourCity" name="newTourCity" required><br><br>

        <label for="newTourCategory">Категория:</label>
        <input type="text" id="newTourCategory" name="newTourCategory" required><br><br>

        <label for="newTourImg">URL изображения:</label>
        <input type="text" id="newTourImg" name="newTourImg" required><br><br>

        <label for="newTourDescription">Описание:</label>
        <textarea id="newTourDescription" name="newTourDescription" rows="4" cols="50" required></textarea><br><br>

        <button type="submit">Добавить тур</button>
        <button id='cancel'>Отмена</button>`;
    }
    else{
        addForm.innerHTML = `
        <h2>Добавить нового админа</h2>
        <label for="newAdminLogin">Логин:</label>
        <input type="text" id="newAdminLogin" name="newAdminLogin" required><br><br>

        <label for="newAdminPassword">Пароль:</label>
        <input type="password" id="newAdminPassword" name="newAdminPassword" required><br><br>


        <button type="submit">Добавить админа</button>
        <button id='cancel'>Отмена</button>`;
    }

    const container = document.querySelector('.container');
    const table = document.querySelector('table');
    container.insertBefore(addForm, table);

    const cancelForm = document.getElementById('cancel')
    cancelForm.addEventListener('click', async function(){
        addNew.disabled=false
        addForm.reset();

        container.remove(addForm);
    })
    if (table_category == 'tours'){
        console.log('here')
        addForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            addNew.disabled=false
            const newTourCountry = document.getElementById('newTourCountry').value;
            const newTourCity = document.getElementById('newTourCity').value;
            const newTourCategory = document.getElementById('newTourCategory').value;
            const newTourImg = document.getElementById('newTourImg').value;
            const newTourDescription = document.getElementById('newTourDescription').value;

            const newTour = {
                country: newTourCountry,
                city: newTourCity,
                category: newTourCategory,
                img: newTourImg,
                description: newTourDescription
            };

            await tr_add(newTour, initialTours, 'tours');
            
            addForm.reset();

            container.remove(addForm);
        })
    }
    else{
        addForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            addNew.disabled=false
            const newAdminLogin = document.getElementById('newAdminLogin').value;
            let newAdminPassword = document.getElementById('newAdminPassword').value;

            newAdminPassword = await hashPassword(newAdminPassword);
            const newAdmin = {
                login: newAdminLogin,
                password: newAdminPassword,
            };

            await tr_add(newAdmin, initialAdmins, 'admins');
            
            addForm.reset();

            container.remove(addForm);
        })
    }
})


async function tr_add(tr_new, tr_arr, tr_table) {
    try {
        let newId = 1;
        if (tr_arr.length > 0) {
            newId = Math.max(...tr_arr.map(arr => arr.id)) + 1;
        }

        tr_new.id = newId;

        if (tr_table=='tours'){
            initialTours.push(tr_new);
            initTours(initialTours);
        }
        else if(tr_table=='admins'){
            initialAdmins.push(tr_new); // Мутируем массив initialTours
            initAdmins(initialAdmins);
        }
    } catch (error) {
    console.error('Ошибка добавления тура:', error);
    }
}

async function showEditForm(tr_Id) {
    let tourEditForm = document.getElementById('tourEdit_form')
    if (document.getElementById('tourEdit_form')==null){
        tourEditForm =document.createElement('form')
        tourEditForm.id = 'tourEdit_form'   
    }
    tourEditForm.innerHTML=``;
    tourEditForm.innerHTML = `
        <h2>Редактировать тур</h2>
        <input type="hidden" id="editTourId" name="editTourId">
        <label for="editTourCountry">Страна:</label>
        <input type="text" id="editTourCountry" name="editTourCountry" required><br><br>
        <label for="editTourCity">Город:</label>
        <input type="text" id="editTourCity" name="editTourCity" required><br><br>
        <label for="editTourCategory">Категория:</label>
        <input type="text" id="editTourCategory" name="editTourCategory" required><br><br>
        <label for="editTourImg">URL изображения:</label>
        <input type="text" id="editTourImg" name="editTourImg" required><br><br>
        <label for="editTourDescription">Описание:</label>
        <textarea id="editTourDescription" name="editTourDescription" rows="4" cols="50" required></textarea><br><br>
        <button type="submit">Сохранить изменения</button>
        <button type="button" id="cancelEditTour">Отмена</button>`;
            
    const container = document.querySelector('.container');
    const table = document.querySelector('table');
    container.insertBefore(tourEditForm, table);

    const cancelForm = document.getElementById('cancelEditTour')
    cancelForm.addEventListener('click', async function(){
        tourEditForm.reset();

        container.remove(tourEditForm);
    })
            
    tourEditForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const editTourId = parseInt(document.getElementById('editTourId').value);
        const editTourCountry = document.getElementById('editTourCountry').value;
        const editTourCity = document.getElementById('editTourCity').value;
        const editTourCategory = document.getElementById('editTourCategory').value;
        const editTourImg = document.getElementById('editTourImg').value;
        const editTourDescription = document.getElementById('editTourDescription').value;

        const updatedTour = {
            id: editTourId,
            country: editTourCountry,
            city: editTourCity,
            category: editTourCategory,
            img: editTourImg,
            description: editTourDescription
        };

        await tr_edit(updatedTour, 'tours');

        tourEditForm.style.display = 'none';
    })

    const trToEdit = initialTours.find(tour => tour.id === tr_Id);

    tourEditForm.style.display = 'block';  // Show the form
    document.getElementById('editTourId').value = trToEdit.id;
    document.getElementById('editTourCountry').value = trToEdit.country;
    document.getElementById('editTourCity').value = trToEdit.city;
    document.getElementById('editTourCategory').value = trToEdit.category;
    document.getElementById('editTourImg').value = trToEdit.img;
    document.getElementById('editTourDescription').value = trToEdit.description;
}



async function tr_edit(updatedObject) {
    try {
        const index = initialTours.findIndex(tour => tour.id === updatedObject.id);
        if (index !== -1) {
        initialTours[index] = { ...updatedObject }; // Создаем копию updatedObject

            initTours(initialTours); // Обновляем UI
        }
    } catch (error) {
        console.error('Ошибка редактирования тура:', error);
    }
}