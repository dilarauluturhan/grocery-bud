import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {/*
      items.map kullanılarak "items" dizisi üzerinde döngü oluşturulur.
      item üzerinde dönerken, "id" ve "title" değerleri ayrıştırılır.
      article elementi oluşturulur ve "key" özelliği "id" değeri ile ayarlanır. Bu her öğenin benzersiz bir kimlik değerine sahip olduğunu belirtir.
      Maddenin  başlığını göstermek için p elementi oluşturulur ve "title" değeri içerik olarak yerleştirilir.
      */}
      {
        items.map((item) => {
          const { id, title } = item;
          return <article key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              {/* Düzenleme düğmesi (FaEdit) "editItem" fonksiyonunu tetikler ve id değerini ileterek öğenin düzenlenmesini sağlar. */}
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              {/* Silme düğmesi (FaTrash) "removeItem" fonksiyonunu tetikler ve id değerini ileterek öğenin kaldırılmasını sağlar. */}
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        })
      }
    </div>
  )
}

export default List;

/*
Döngü tamamlandıktan sonra alışveriş listesi öğelerini içeren "div" elementi döndürülür.
Bu kod alışveriş listesindeki maddeleri görüntülemek için kullanılan bir componentı tanımlar.
Her öğe için düzenleme ve silme işlevselliği sağlanır.
*/