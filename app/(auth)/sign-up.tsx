import { icons, images } from '@/constants'
import { ScrollView, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { router } from 'expo-router'

import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import { Link } from '@react-navigation/native'
import OAuth from '@/components/OAuth'
import ReactNativeModal from 'react-native-modal'

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [verification, setVerification] = useState({
    state: 'success',
    error: '',
    code: '',
  })

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({ ...verification, state: 'pending' })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) return

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        //create a database user

        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({ ...verification, state: 'success' })
      } else {
        setVerification({
          ...verification,
          error: 'Verification failed.',
          state: 'failed',
        })
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      })
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full z-0 h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your Name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            to="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an accont? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

        {/* Verification modal*/}

        <ReactNativeModal isVisible={verification.state === 'success'}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />

            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>

            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account
            </Text>

            <CustomButton title='Browse Home' onPress={() => router.replace('/(root)/(tabs)/home')} className='mt-5'/>
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  )
}

export default SignUp
