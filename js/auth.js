import { initialAdmins} from "./data.js";
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
const enterForm = document.getElementById('enter_form');
enterForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let adminLogin = document.getElementById('username').value;
    let adminPassword = document.getElementById('password').value;
    
    adminPassword = await hashPassword(adminPassword);

    initialAdmins.forEach(admin => {
        if (adminLogin == admin.login && adminPassword == admin.password) {
            location.href = '/admin.html';
        }
        else{
            window.alert("Данные не верны")
        }
    });
});
