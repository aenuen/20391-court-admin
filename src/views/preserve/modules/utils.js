import { timeGetYear } from 'abbott-methods/import'
export const postData = (form) => {
  const data = {}
  data.cCourt = form.cCourt
  data.courtType = form.courtType
  data.courtCategory = form.courtCategory
  data.cMoney = form.cMoney
  data.guaranteeCase = form.guaranteeCase
  data.cIssueStatus = form.cIssueStatus
  data.cDesc = form.cDesc
  if (+data.guaranteeCase === 2) {
    data.noGuaranteeReason = form.noGuaranteeReason
  }
  if (+data.courtCategory === 2) {
    data.cCaseType = form.cCaseType
    const year = form.caseYear.length === 4 ? form.caseYear : timeGetYear(data.gCaseYear)
    data.cCaseNo = `（${year}）|${form.caseCode}|${form.caseZips}|${form.codeOrder}|号`
    data.cCaseReason = form.cCaseReason
    if (+data.cCaseType === 13) {
      data.cCaseReason = form.cCaseReasonMain
      data.cCaseReason2 = form.cCaseReasonAction
    }
  }
  return data
}
