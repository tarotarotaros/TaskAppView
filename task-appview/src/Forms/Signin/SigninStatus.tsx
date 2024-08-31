
const SigninStatus = () => {

    let authToken = sessionStorage.getItem('authToken');

    let statuText = "ログインしていません。"

    if (authToken != null) {
        statuText = "ログインしています。";
    }
    return <div>{statuText}</div>;
};

export default SigninStatus;
