
const SigninStatus = () => {

    let authToken = sessionStorage.getItem('authToken');

    let statuText = "サインインしていません。"

    if (authToken != null) {
        statuText = "サインイン中";
    }
    return <div><p>{statuText}</p></div>;
};

export default SigninStatus;
