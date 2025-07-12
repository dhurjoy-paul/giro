import axios from "axios"

// save or update user in db
export const saveUserInDb = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    user
  )
  console.log('User data saved to DB-->', data)
}