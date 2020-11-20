// Show an object on the screen.
/** 
 * THIS IS NO LONGER USED AS THE API CONNECTION. RATHER THIS IS 
 * USED FOR REFERENCE OF ALL OF THE ENDPOINTS WITH THE BACKEND
 */


function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => preParent.classList.remove('flashing'), 300);
}

// Axios responses have a lot of data. This shows only the most relevant data.
function showResponse(axiosResponse) {
  const fullResponse = axiosResponse.response === undefined
    ? axiosResponse
    : axiosResponse.response;
  const abridgedResponse = {
    data: fullResponse.data,
    status: fullResponse.status,
    statusText: fullResponse.statusText,
  };
  showObject(abridgedResponse);
}

// IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE

// EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

/**
 * You can use axios to make API calls like this:
 * const body = { bar: 'baz' };
 * axios.post('/api/foo', body)
 *   .then(showResponse) // on success (Status Code 200)
 *   .catch(showResponse); // on failure (Other Status Code)
 * See https://github.com/axios/axios for more info
 */

// Hint: do not assume a 1:1 mapping between forms and routes

function createUser(fields) {
  axios.post("/api/users/user", fields)
  .then(showResponse)
  .catch(showResponse);
}

function changeUsername(fields) {
  axios.put("/api/users/updateUsername", fields)
  .then(showResponse)
  .catch(showResponse);
}

function changePassword(fields) {
  axios.put("/api/users/updatePassword", fields)
  .then(showResponse)
  .catch(showResponse);
}

function deleteUser(fields) {
  axios.delete("/api/users/delete")
  .then(showResponse)
  .catch(showResponse);
}

function signIn(fields) {
  axios.post("/api/users/signin", fields)
  .then(showResponse)
  .catch(showResponse);
}

function signOut(fields) {
  axios.delete("/api/users/session")
  .then(showResponse)
  .catch(showResponse);
}

function followUser(fields) {
  axios.post("/api/users/follow", fields)
  .then(showResponse)
  .catch(showResponse);
}

function viewAllFreets(fields) {
  axios.get("/api/freets/allFreets")
  .then(showResponse)
  .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
    axios.post("/api/freets/author", fields)
    .then(showResponse)
    .catch(showResponse);
}

function createFreet(fields) {
  axios.post("/api/freets/create", fields)
  .then(showResponse)
  .catch(showResponse);
}

function upvoteFreet(fields) {
  axios.post("/api/freets/upvote", fields)
  .then(showResponse)
  .catch(showResponse);
}

function reFreet(fields) {
  axios.post("/api/freets/refreet", fields)
  .then(showResponse)
  .catch(showResponse);
}


function editFreet(fields) {
    axios.put("/api/freets/Freet", fields)
    .then(showResponse)
    .catch(showResponse);
}

function deleteFreet(fields) {
    axios.delete("/api/freets/" + fields.id, fields)
    .then(showResponse)
    .catch(showResponse);
}

// IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE BELOW

// map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'follow-user': followUser,
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'upvote-freet': upvoteFreet,
  'refreet': reFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
};

// attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = (e) => {
      e.preventDefault();
      const data = {};
      (new FormData(form)).forEach((value, key) => {
        data[key] = value;
      });
      handler(data);
      return false; // don't reload page
    };
  });
}

window.onload = init; // attach handlers once DOM is ready
