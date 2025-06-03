import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import signStyle from './signup.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    email: Yup.string()
        .required('Email is required')
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            'Invalid email address'
        ),
    password: Yup.string()
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

function Signup() {

    const router = useRouter();

    const { register, handleSubmit, setValue, reset, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        const storedData = localStorage.getItem('signupData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            Object.entries(parsedData).map(
                ([key, value]) => setValue(key, value)
            );
        }
    }, [setValue]);

    const onSubmit = (data) => {
        // console.log(data);

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = existingUsers.some(user => user.email === data.email);

        if (userExists) {
            alert('A user with this email already exists.');
            return;
        }

        existingUsers.push(data);

        localStorage.setItem('users', JSON.stringify(existingUsers));
        reset();
        router.push('/signin');
    };

    return (
        <section className={signStyle.signSec}>
            <div className={signStyle.signSecContnr}>
                <form className={signStyle.signSecfrm} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={signStyle.signSecTlt}>Sign Up</h2>
                    <div className={signStyle.frmPos}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Your Username"
                            {...register('username')}
                        />
                        {errors.username && <p className={signStyle.error}>{errors.username.message}</p>}
                    </div>
                    <div className={signStyle.frmPos}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            {...register('email')}
                        />
                        {errors.email && <p className={signStyle.error}>{errors.email.message}</p>}
                    </div>
                    <div className={signStyle.frmPos}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                            {...register('password')}
                        />
                        {errors.password && <p className={signStyle.error}>{errors.password.message}</p>}
                    </div>
                    <div className={signStyle.frmPos}>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Your Password"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className={signStyle.error}>{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button type="submit">Sign Up</button>

                    <div className={signStyle.botmDiv}>
                        <p>Already have an account? <Link href="/signin">Signin</Link> </p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signup;
