import React ,{useState} from 'react';


async function registerUser(userData) {
    return fetch('http://localhost:3007/login/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(data => data.json())
  }


const Register = ({changePage, setToken}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [validPass, setValidPass] = useState();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();


  
    const handleSubmit = async e => {
      e.preventDefault();

      if (password === validPass) {

      
      const token = await registerUser({
        email,
        password,
        firstName,
        lastName,
        phone
      });
      if (token.error){
        alert(token.error);
      }
      if (token.success){
        alert(token.success);
      }
      setToken(token);
    }
    else {
        alert("Passwords do not match.");
    }
    };



  return (
    <div className='container mx-auto py-6'>
        <div className='container my-20 py-10 max-w-fit mx-auto border rounded-xl border-gray-400 shadow-lg px-5'>
        <form onSubmit={handleSubmit} className='max-w-full mx-auto'>
            <legend className='font-bold text-4xl text-center mb-4'>Register</legend>
            <p className='mb-4'>Create your own account. It's free and only takes a minute.</p>
            <div className='grid grid-cols-2 gap-5'>
                <input required type="text" placeholder='First Name' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2' onChange={e => setFirstName(e.target.value)}/>
                <input required type="text" placeholder='Last Name' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2' onChange={e => setLastName(e.target.value)}/>
            </div>
            <div className='mt-5'>
                <input required type="text" placeholder='Phone Number' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2 w-full' onChange={e => setPhone(e.target.value)}/>
            </div>
            <div className='mt-5'>
                <input required type="text" placeholder='Email' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2 w-full' onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className='mt-5'>
                <input required type="password" placeholder='Password' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2 w-full' onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='mt-5'>
                <input required type="password" placeholder='Confirm Password' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2 w-full' onChange={e => setValidPass(e.target.value)}/>
            </div>
            <div className='mt-5'>
                <button className='text-white py-2 px-2 rounded-md bg-blue-400 w-full hover:bg-blue-700'>Sign Up</button>
            </div>
        </form>
        <div className='mt-5'>
        <p>Already registered?</p>
        <a type='button' className="text-blue-400 underline cursor-pointer" onClick={() => changePage()}>Sign In</a>
        </div>
        </div>
    </div>
  )
}

export default Register;