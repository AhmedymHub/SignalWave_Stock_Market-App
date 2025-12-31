'use client';

import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const SignIn = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
    },);

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if(result.success) router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Sign in failed.', {
                description: e instanceof Error ? e.message : 'Failed to sing in'
            });
        }
    }

    return (
        <>
           <div className="text-center pt-4">
            <h1 className="form-title">Welcome back</h1>
           </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@ahmedym.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 2 }}
                />

                <Button type="submit" disabled={isSubmitting} className="blue-btn w-full mt-5 hover:bg-green-300">
                    {isSubmitting ? 'Loging In' : 'Log In'}
                </Button>
                <FooterLink text="Don't have an account" linkText="Sign up" href="/sign-up" />
            </form>
        </>
    )
}
export default SignIn
