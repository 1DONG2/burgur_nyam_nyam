import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import NweetFactory from 'components/NweetFactory';
import burgurs from '../files/burgur.json';
import '../Checkbox.css'

function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const q = query(collection(dbService, 'nweets'));
    onSnapshot(q, (snapshot) => {
      // forEach보다 map을 사용하면(getDocs) re-render 발생 감소
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const tableStyle = {
    marginTop: 30,
    borderCollapse: 'collapse',
    width: '100%'
  };
  
  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
  };
  
  const tdStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    tableLayout: 'fixed'
  };
  
  const tableContainerStyle = {
    overflowX: 'auto',
    height: 300
  };

  const brands = ['맘스터치', 'KFC', '서브웨이', '맥도날드', '프랭크버거', '버거킹', '노브랜드'];
  
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredBurgurs, setFilteredBurgurs] = useState(burgurs);


  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, value]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((brand) => brand !== value)
      );
    }
    
    // 선택된 브랜드에 따라 burgurs 배열을 필터링합니다.
    const filtered = burgurs.filter((burgur) =>
      selectedBrands.includes(burgur.브랜드)
    );
    setFilteredBurgurs(filtered);
  };
  

  return (
      <div>
      <div className='container'>
        <NweetFactory userObj={userObj} />
      </div>
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
      <form>
      {brands.map((brand) => (
        <label key={brand} style={{marginRight : 30}}>
          <input
            type="checkbox"
            name="brand"
            value={brand}
            onChange={handleCheckboxChange}
            checked={selectedBrands.includes(brand)}
          />
          {brand}
        </label>
      ))}
      </form>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
              <tr>
                <th style={thStyle}>브랜드</th>
                <th style={thStyle}>점포명</th>
                <th style={thStyle}>도로명주소</th>
                <th style={thStyle}>전화번호</th>
              </tr>
          </thead>
          <tbody>
          {filteredBurgurs.map((burgur) => (
            <tr key={burgur.id}>
              <td style={tdStyle}>{burgur.브랜드}</td>
              <td style={tdStyle}>{burgur.점포명}</td>
              <td style={tdStyle}>{burgur.도로명주소}</td>
              <td style={tdStyle}>{burgur.전화번호}</td>
            </tr>
          ))}
          </tbody>
          </table>
      </div>
    </div>
  );
}

export default Home;
