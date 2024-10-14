
export default function Hello() {

  function isLogin(): boolean {
    let authToken = sessionStorage.getItem('authToken');
    if (authToken != null && authToken !== '') {
      return true
    }
    else {
      return false;
    }
  }

  return (
    <div>
      Hello
      {
        isLogin() ? (
          <p>(ログイン中)</p>
        ) : null
      }
    </div>
  );
};
