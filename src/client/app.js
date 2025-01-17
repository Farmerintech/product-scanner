const formData = {
   username:"Shukurahlillah",
   password:"12345678"
}

const fetchData = async () =>{
    try {
        const resp = await fetch('https://product-scanner-cqro.onrender.com/api/v1/auth/login', {
           method:"POST",
           headers:{
              'content-Type':'application/json',
           },
           body: JSON.stringify(
              formData
           )
        })
        const data = await resp.json();
        console.log(data)
        token = data.user.token
        return token 
     } catch (error) {
        msg.innerText= 'server error' 
        console.log(error)
     }
  }
   

  fetchData();


  const productData = {
   name:"sugar",
   Qrcode:"12345678"
}

const addProduct = async () =>{
    try {
        const resp = await fetch('https://product-scanner-cqro.onrender.com/api/v1/products/add_product', {
           method:"POST",
           headers:{
              'content-Type':'application/json',
              "Authorization": `Bearer ${token}`
           },
           body: JSON.stringify(
            productData
           )
        })
        const data = await resp.json();
        console.log(data)
        token = data.user.token
        return token 
     } catch (error) { 
        console.log(error)
     }
  }
   
addProduct()
const scanProduct = async () =>{
   try {
       const resp = await fetch('https://product-scanner-cqro.onrender.com/api/v1/products/scan', {
          method:"POST",
          headers:{
             'content-Type':'application/json',
             "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(
           productData
          )
       })
       const data = await resp.json();
       console.log(data)
       token = data.user.token
       return token 
    } catch (error) { 
       console.log(error)
    }
 }
  
scanProduct()