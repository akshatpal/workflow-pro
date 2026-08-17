import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import {
    loginSchema,
    type LoginFormValues,
} from "../features/auth/loginSchema";

import {
    useLoginMutation,
} from "../features/auth/authApi";

import {
    useAppDispatch,
    useAppSelector,
} from "../store/hooks";

import {
    setCredentials,
} from "../features/auth/authSlice";

import { Navigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        isAuthenticated,
    } = useAppSelector(
        (state) => state.auth
    );

    const [login, { isLoading }] =
        useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(
            loginSchema
        ),
    });

    if (isAuthenticated) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    const onSubmit = async (
        values: LoginFormValues
    ) => {
        try {
            const response =
                await login(values).unwrap();

            dispatch(
                setCredentials({
                    accessToken:
                        response.data.accessToken,

                    user: response.data.user,
                })
            );

            toast.success(
                "Login Successful"
            );

            navigate("/dashboard");
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                "Login failed"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-8 text-center text-3xl font-bold">
                    Workflow Pro
                </h1>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-5"
                >
                    <Input
                        label="Email"

                        type="email"

                        placeholder="Enter email"

                        error={
                            errors.email?.message
                        }

                        {...register("email")}
                    />

                    <Input
                        label="Password"

                        type="password"

                        placeholder="Enter password"

                        error={
                            errors.password
                                ?.message
                        }

                        {...register(
                            "password"
                        )}
                    />

                    <Button
                        type="submit"
                        loading={isLoading}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}   