import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import signStyle from './signin.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            'Invalid email address'
        ),
    password: Yup.string()
        .required('Password is required'),
});

function Signin() {

    const router = useRouter();

    const { register, handleSubmit, setError, reset, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            router.push('/');
        }
    }, []);



    const onSubmit = (data) => {

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const matchedUser = existingUsers.find(
            user => user.email === data.email && user.password === data.password
        );


        if (matchedUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
            router.push('/');
        } else {
            setError('email', { type: 'manual', message: 'Invalid email or password' });
            setError('password', { type: 'manual', message: 'Invalid email or password' });
        }

    };

    return (
        <section className={signStyle.signSec}>
            <div className={signStyle.signSecContnr}>
                <form className={signStyle.signSecfrm} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={signStyle.signSecTlt}>Sign In</h2>

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
                    <button type="submit">Sign In</button>

                    <div className={signStyle.botmDiv}>
                        <p>Create a account? <Link href="/signup">SignUp</Link> </p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signin;
