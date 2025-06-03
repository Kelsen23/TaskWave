import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router-dom";

type LoggedInProps = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  email: z.string().email({
    message: "Please enter a valid email address.",
  }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LogIn = ({ loggedIn, setLoggedIn }: LoggedInProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { logIn, error } = useAuthStore();

  if (loggedIn && !error) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div>
        <div className="flex gap-2 justify-center mb-10 font-semibold text-2xl select-none">
          {["Log", "In"].map((word, i) => (
            <div className="flex" key={i}>
              {word.split("").map((letter, j) => (
                <motion.h1
                  key={`${i}-${j}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 * (i * 4 + j) }}
                >
                  {letter}
                </motion.h1>
              ))}
            </div>
          ))}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              logIn(values);

              setLoggedIn(true);
            })}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <input
                      className={`
                      w-70
                      px-4 py-2
                      rounded-md
                      border
                      border-gray-300
                      bg-white
                      text-gray-900
                      placeholder-gray-400
                      transition
                      focus:outline-none
                      focus:ring-1
                      focus:ring-blue-500
                      focus:border-blue-500
                      shadow-sm
                      hover:border-blue-400
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    `}
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <AnimatePresence mode="wait">
                    {form.formState.errors.username && (
                      <motion.p
                        className="font-semibold text-sm text-red-500"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {form.formState.errors.username.message as string}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      className={`
                      w-70
                      px-4 py-2
                      rounded-md
                      border
                      border-gray-300
                      bg-white
                      text-gray-900
                      placeholder-gray-400
                      transition
                      focus:outline-none
                      focus:ring-1
                      focus:ring-blue-500
                      focus:border-blue-500
                      shadow-sm
                      hover:border-blue-400
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    `}
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <AnimatePresence mode="wait">
                    {form.formState.errors.email && (
                      <motion.p
                        className="font-semibold text-sm text-red-500"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {form.formState.errors.email.message as string}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      className={`
                      w-70
                      px-4 py-2
                      rounded-md
                      border
                      border-gray-300
                      bg-white
                      text-gray-900
                      placeholder-gray-400
                      transition
                      focus:outline-none
                      focus:ring-1
                      focus:ring-blue-500
                      focus:border-blue-500
                      shadow-sm
                      hover:border-blue-400
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    `}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <AnimatePresence mode="wait">
                    {form.formState.errors.password && (
                      <motion.p
                        className="font-semibold text-sm text-red-500"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {form.formState.errors.password.message as string}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-5 cursor-pointer w-full bg-blue-700 text-white hover:bg-blue-800"
            >
              Log In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
