
export const MAU_PHIEUCHI =
`<!doctype html>
<html lang='en'>
  <head>
      <meta charset='utf-8'>
      <title>Print Preview</title>
      <meta name='description' content='Print preview'>
      <style type='text/css'>
          @media print {
              #printbutton {display:none;}
          }
          .tddetail td {
              border-top: 1px solid;
              border-right: 1px solid;
          }
          .tddetail th {
              border-right: 1px solid;
          }
          .tddetail td:last-child, th:last-child {
              border-right: none;
          }
          .trnobody td {
              border: none;
          }
          .trassign td {
              padding-top: 16px;
          }
          .dotline {
              border-bottom: 1px dashed;
              min-height: 21px;

          }
          .phonediv {
              width: 175px;
          }

          .innerleft {
              float: left
          }
      </style>
  </head>
  <body style='background:#fff'>
  <table width='100%'>
      <tr>
          <td>
              Công ty : [[COMPANY_NAME]]<br>
              Địa chỉ : [[COMPANY_ADDRESS]] <br>
              <div class='phonediv innerleft'>ĐT : [[COMPANY_PHONE]]</div> &nbsp<div class='innerleft'> Fax : [[COMPANY_FAX]]</div>
          </td>
          <td style='width: 35%'>
              Ngày : [[CASHFLOW_DATECREATED]] <br>
              Số : [[CASHFLOW_CODE]] <br>
              Cửa hàng : [[CASHFLOW_LOCATION]]
          </td>
      </tr>
  </table>

  <table style='width: 90%'>
      <tbody>
          <tr>
              <td colspan='2' style='text-align: center'>
                  <h2 id=''>PHIẾU [[CASHFLOW_TYPE]]</h2>
              </td>
          </tr>
          <tr>
              <td style='width: 120px;padding-right 0'>
                   Đối tượng :
              </td>
              <td>
                  <div class='dotline'>[[CASHFLOW_PARTNER]]</div>
              </td>
          </tr>
          <tr>
              <td>
                   Thanh toán bằng :
              </td>
              <td><div class='dotline'> [[CASHFLOW_PAYMENTTYPE]] [[CASHFLOW_BANKNAME]]</div></td>
          </tr>
          <tr>
              <td>
                  Số tài khoản :
              </td>
              <td><div class='dotline'> [[CASHFLOW_ACCOUNTNUMBER]]</div></td>
          </tr>
          <tr>
              <td>
                  Lý do nộp :
              </td>
              <td><div class='dotline'>[[CASHFLOW_TITLE]]</div></td>
          </tr>
          <tr>
              <td>
                  Số tiền :
              </td>
              <td><div class='dotline'>[[CASHFLOW_VALUE]]</div></td>
          </tr>
          <tr>
              <td>
                  Ghi chú :
              </td>
              <td><div class='dotline'>[[CASHFLOW_NOTE]]</div> </td>
          </tr>
      </tbody>
  </table>

  <table width='100%' style='margin-top: 16px'>
      <tr class='trnobody'>
          <td colspan='3'></td>
          <td  style='text-align: center' colspan='7'>
              Ngày.......... Tháng.......... Năm..........
          </td>
          <td></td>
      </tr>
      <tr class='trassign'>
          <td colspan='2' width='30%'>Người nộp / thu tiền</td>
          <td colspan='2' width='30%'>Người lập phiếu</td>
          <td colspan='2' width='30%'>Giám đốc</td>
          <td colspan='2' width='30%'>Thủ quỹ</td>
      </tr>
  </table>
  </body>
</html>
`;
