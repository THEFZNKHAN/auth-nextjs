const UserProfile = ({ params }: any) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Single Profile Page</h1>
            <hr />
            <p className="text-4xl">Single Profile page content goes here {params.id}</p>
        </div>
    );
};

export default UserProfile;
