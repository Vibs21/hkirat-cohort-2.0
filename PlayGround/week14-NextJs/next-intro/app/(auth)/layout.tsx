export default function Signup({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
    <div>
        <div className='border-b text-center'>
            20% off for the next 3 days!
        </div>
        {children}
    </div>
    )
}
