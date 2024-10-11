import { images } from '@/constants'
import { ScrollView, Text, View, Image } from 'react-native'


const SignUp = () => {
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='w-full z-0 h-[250px]'/>
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Create your Account
          </Text>
        </View>
       
       <View className='p-5'>

       </View>
      </View>
    </ScrollView>
  )
}

export default SignUp
