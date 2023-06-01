import React, { useState, useEffect } from 'react';
import List from './List.js';
import Alert from './Alert.js';

/*
"getLocaleStorage" fonksiyonu yerel depolamadan kaydedilmiş bir listeyi almak için kullanılıyor.
"localStorage.getItem" ile "list" adında bir anahtarla kaydedilmiş değeri alıyorum.
Eğer bu değer mevcutsa JSON.parse ile ayrıştırıp geri döndürüyorum.
Eğer "list" mevcut değilse boş bir dizi döndürüyor.
*/
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false, // Uyarı mesajının görüntülenip görüntülenmeyeceğini kontrol eder.
    msg: '', // Uyarı mesajının içeriğini temsil eder. 
    type: '' // Uyarı mesajının türünü belirtir. 
  });

  /*
  "handleSubmit" fonksiyonu form gönderildiğinde gerçekleşecek işlemleri yönetiyor.
  Formun varsayılan davranışını engellemek için e.preventDefault() kullandım.
  Ardından girilen name değerinin kontrolü yapılıyor.
  Eğer name değeri boşsa showAlert fonksiyonu çağrılarak hata mesajı gösteriliyor.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
      // Eğer name değeri boş değilse ve isEditing durumu true ise listenin güncellenmesi gerekiyor demektir. 
    } else if (name && isEditing) {
      // list.map kullanılarak editID'ye eşit olan öğe bulunuyor ve title alanı name ile güncelleniyor. 
      // Diğer öğeler aynı kalıyor.
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      );
      // setName(''), setEditID(null), setIsEditing(false) çağrıları ile ilgili durum değişkenleri sıfırlanıyor.
      // showAlert fonksiyonu çağrılarak başarı mesajı gösteriliyor.
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      /*
      Eğer name değeri boş değilse ve isEditing durumu false ise yeni bir öğe listenin sonuna ekleniyor.
      Bunun için önce showAlert fonksiyonu çağrılarak başarı mesajı gösteriliyor.
      Ardından newItem adında bir const oluşturuluyor ve setList ile mevcut listenin sonuna ekleniyor.
      */
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      // Son olarak, setName('') çağrısı ile name durumu sıfırlanıyor.
      setName('');
    }
  };

  // showAlert fonksiyonu bir uyarı mesajının görüntülenmesini sağlıyor. 
  // show, type ve msg parametreleri alarak alert durumunu güncelliyor.
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // clearList fonksiyonu, listeyi temizlemek için kullanılıyor.
  // Önce showAlert fonksiyonu çağrılarak temizlik mesajı gösteriliyor. Ardından setList([]) çağrısı ile liste sıfırlanıyor.
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  /*
  removeItem fonksiyonu belirli bir maddenin listeden kaldırılmasını sağlıyor.
  list.filter kullanılarak belirtilen id'ye sahip olan madde hariç diğer maddelerin bir alt kümesi dönüyor.
  setList ile bu alt küme liste olarak güncelleniyor.
  Ayrıca showAlert fonksiyonu çağrılarak kaldırma mesajı gösteriliyor.
  */
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
  }

  /*
  editItem fonksiyonu belirli bir maddenin düzenlenmesini sağlıyor.
  İlk olarak list.find kullanılarak belirtilen id'ye sahip olan madde bulunuyor.
  Daha sonra setIsEditing(true) ile düzenleme modu aktif hale getiriliyor,
  setEditID(id) ile düzenlenen maddenin kimliği güncelleniyor,
  setName(specificItem.title) ile name durumu düzenlenen madde başlığıyla güncelleniyor.
  */
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  /*
  useEffect kullanılarak "list" durumu değiştiğinde yerel depolama güncelleniyor.
  localStorage.setItem ile "list" değeri JSON.stringify ile dizeye dönüştürülerek kaydediliyor.
  Bu sayede sayfa yenilendiğinde veya bileşen tekrar render edildiğinde verilerin korunması sağlanıyor.
  */
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]);

  /*
  Component'ın return yapısında form elemanı ve liste gösterimi bulunuyor.
  "alert.show" durumu doğru ise "Alert" componentı "alert" durumu ve diğer prop'larıyla birlikte render ediliyor.

  */
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert}
          removeAlert={showAlert}
          list={list}
        />}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          {/*
          Input elemanı "name" durumu ile senkronize olarak güncelleniyor.
          Kullanıcı item girişini yaparken "onChange" olayı tetiklenerek "setName" ile "name" durumu güncelleniyor.
          */}
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {/*
      Liste elemanları varsa List bileşeni items, removeItem ve editItem prop'ları ile birlikte render ediliyor.
      Ayrıca liste temizleme butonu da render ediliyor.
      */}
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>Clear Items</button>
        </div>
      )}
    </section>
  )
}

export default App