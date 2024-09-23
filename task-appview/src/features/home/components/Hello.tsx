
export default function Hello() {

  function isSignin(): boolean {
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
        isSignin() ? (
          <p>(サインイン中)</p>
        ) : null
      }
    </div>
  );
};
