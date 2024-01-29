import ProfileForm from "@/components/profileForm";

export default function Login() {
  return (
    <section className="h-full max-w-[1550px] flex justify-center items-center">
      <div className="text-primary-text ">
        <ProfileForm />
      </div>
      <div>Go back</div>
    </section>
  );
}
