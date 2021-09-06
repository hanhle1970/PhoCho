class Utilities {
    getPriceInWord(amount) {
        let bi = amount / 1000000000; //bilion
        let mi = amount / 1000000; //milion
        let ki = amount / 1000;

        if (bi > 0) {
            let price = this.madeNumber(bi, amount - bi*1000000000);
            return `${price} tỷ VND`;
        }
        else if (mi > 0) {
            return `${this.madeNumber(mi, amount - mi*1000000)} triệu VND`;
        }
        else if (ki > 0) {
            return `${this.madeNumber(ki, amount - ki*1000)} ngàn VND`;
        }
        else {
            return `${amount} đồng`;
        }
    }

    madeNumber(num1, num2) {
        let str = `${num1}.${num2}`;
        //return str.replaceAll(new RegExp("([.]*0+)(?!.*\\d)"), "");
        return str.replaceAll(/([.]*0+)(?!.*\d)/g, "");
        //return str;
    }

    getDuration(tm) {
        var dt = Date.now() - tm; //milliseconds
        var inDays = parseInt(dt/(24*3600*1000));
        var inHours = parseInt(dt/(3600*1000));
        var inMinutes = parseInt(dt/(60*1000));
    
        if (inDays > 365) {
          return 'Hơn 1 năm';
        }
        else if (inDays > 30) {
          var months = inDays / 30;
          return `${months} tháng trước`;
        }
        else if (inDays > 1) {
          return `${inDays} ngày trước`;
        }
        else if (inDays == 1) {
          return 'Hôm qua';
        }
        else if (inHours > 1) {
          return `${inHours} giờ trước`;
        }
        else if (inMinutes > 1) {
          return `${inMinutes} phút trước`;
        }
        else {
          return 'Vài giây trước';
        }
      }
    
}

export default new Utilities();
