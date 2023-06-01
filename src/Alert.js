import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  /*
  useEffect kullanılarak bir etkileşim belirtilir.
  Bu etkileşim component oluşturulduğunda ve "list" prop'unda herhangi bir değişiklik olduğunda çalışacak.
  setTimeout fonksiyonu kullanılarak bir zamanlayıcı oluşturulur.
  Bu zamanlayıcı belirtilen süre sonunda removeAlert fonksiyonunu tetikleyecektir.
  Bu, uyarı mesajının otomatik olarak kaldırılmasını sağlar.
  */
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    /*
    return ifadesi içinde "clearTimeout" fonksiyonu kullanılarak zamanlayıcı temizlenir.
    Bu, componentın kaldırılması veya yeniden render edilmesi durumunda zamanlayıcının düzgün bir şekilde temizlenmesini sağlar.
    */
    return () => clearTimeout(timeout);
  }, [list]);

  /*
  p elementi oluşturulur ve className özelliği alert ve alert-${type} sınıflarını içerir. 
  Bu, uyarı mesajının görüntülenmesi için uygun bir stil sınıfı atanmasını sağlar. 
  msg değeri içerik olarak yerleştirilir.
  */
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;