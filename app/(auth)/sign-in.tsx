import { icons, images } from '@/constants'
import { ScrollView, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import { Link } from '@react-navigation/native'
import OAuth from '@/components/OAuth'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const onSignInPress = async () => {}

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full z-0 h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5">
          
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            to="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Dont't have an account?</Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>

        {/* Verification modal*/}
      </View>
    </ScrollView>
  )
}

export default SignIn
