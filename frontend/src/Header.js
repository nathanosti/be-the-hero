import React from 'react';

//No parametros do Header() está sendo passao a propriedade(props.) tittle na forma destruturada dela
function Header({ tittle }) {
  return (
    <>
      <header>
        <h1>{tittle}</h1>
      </header>
    </>
  );
}

export default Header;

//O conceito do estado (this.state) é uma informação que sera mantida pelo componente como input e etc