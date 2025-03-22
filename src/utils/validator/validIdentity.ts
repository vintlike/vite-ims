const idCartUtil: any = {
  isIdCardNoFormat(card: string) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(card);
  },
  checkIdCardProvince(card: string) {
    const province = card.slice(0, 2);
    return idCartUtil.vcity.hasOwnProperty(province);
  },
  vcity: {
    11: '北京市',
    12: '天津市',
    13: '河北省',
    14: '山西省',
    15: '内蒙古自治区',
    21: '辽宁省',
    22: '吉林省',
    23: '黑龙江省',
    31: '上海市',
    32: '江苏省',
    33: '浙江省',
    34: '安徽省',
    35: '福建省',
    36: '江西省',
    37: '山东省',
    41: '河南省',
    42: '湖北省',
    43: '湖南省',
    44: '广东省',
    45: '广西壮族自治区',
    46: '海南省',
    50: '重庆市',
    51: '四川省',
    52: '贵州省',
    53: '云南省',
    54: '西藏自治区',
    61: '陕西省',
    62: '甘肃省',
    63: '青海省',
    64: '宁夏回族自治区',
    65: '新疆维吾尔族',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  },
  //检查生日是否正确
  getIdCardBirthday(card: string) {
    const len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len === 15) {
      const re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      const arr_data = card.match(re_fifteen) || [];
      const year = arr_data[2];
      const month = arr_data[3];
      const day = arr_data[4];
      const birthday = new Date(`19${year}-${month}-${day}`);
      return idCartUtil.verifyBirthday(birthday) ? birthday : false;
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len === 18) {
      const re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
      const arr_data = card.match(re_eighteen) || [];
      const year = arr_data[2];
      const month = arr_data[3];
      const day = arr_data[4];
      const birthday = new Date(`${year}-${month}-${day}`);
      return idCartUtil.verifyBirthday(birthday) ? birthday : false;
    }
    return false;
  },
  verifyBirthday(birthday: any) {
    birthday = typeof birthday === 'string' ? new Date(birthday) : birthday;
    const now = new Date();
    const now_year = now.getFullYear();
    const age = now_year - birthday.getFullYear();
    return age >= 0 && age <= 150;
  },
  //校验位的检测
  checkParity(card: string) {
    if (card.length === 15) return true;
    else if (card.length === 18) {
      return card.substr(17, 1) === idCartUtil.getParityDigit(card);
    } else return false;
  },
  getParityDigit(card: string) {
    if (card.length !== 18 && card.length !== 17) return false;
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let cardTemp = 0;
    for (let i = 0; i < 17; i++) {
      const num = Number(card.substr(i, 1));
      cardTemp += num * arrInt[i];
    }
    return arrCh[cardTemp % 11];
  },
  change18To15(card: string) {
    if (card.length !== 18) return false;
    return card.substr(0, 6) + card.substr(8, 9);
  },
  //15位转18位身份证号
  change15To18(card: string) {
    if (card.length !== 15) return false;
    card = `${card.substr(0, 6)}19${card.substr(6, 9)}`;
    card += idCartUtil.getParityDigit(card);
    return card;
  }
};

export function validIdentity(card: string) {
  card = card.toUpperCase();
  const r: any = {};
  if (card === '') {
    return false;
  }
  //校验长度，类型
  if (idCartUtil.isIdCardNoFormat(card) === false) {
    return false;
  }
  //检查省份
  if (idCartUtil.checkIdCardProvince(card) === false) {
    return false;
  }
  //校验生日
  r.dob = idCartUtil.getIdCardBirthday(card);
  if (r.dob === false || idCartUtil.checkParity(card) === false) {
    return false;
  } else {
    return true;
  }
}
