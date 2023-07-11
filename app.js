const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWM4YmVmNTcxZmYxMDBiMGU4YTU4ZmIyN2Y3Zjg4YiIsInN1YiI6IjY0YTk2NTBkOWM5N2JkMDExYzU4MzRhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84P1AzFd8vu9tq2Lu_zSyT7QDQIXGdgPCvKu84pH0fY'
    }
  };
  
  fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  function hello(event){
    event.preventDefault();
    console.log("Hi")
  }