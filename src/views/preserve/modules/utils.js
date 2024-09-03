import { timeGetYear } from 'abbott-methods/import'
export const postData = (form) => {
  const courtLitigationVo = {}
  courtLitigationVo.cCourt = form.cCourt
  courtLitigationVo.courtType = form.courtType
  courtLitigationVo.courtCategory = form.courtCategory
  courtLitigationVo.cMoney = form.cMoney
  courtLitigationVo.guaranteeCase = form.guaranteeCase
  courtLitigationVo.cIssueStatus = form.cIssueStatus
  courtLitigationVo.cDesc = form.cDesc
  if (+courtLitigationVo.guaranteeCase === 2) {
    courtLitigationVo.noGuaranteeReason = form.noGuaranteeReason
  }
  if (+courtLitigationVo.courtCategory === 2) {
    courtLitigationVo.cCaseType = form.cCaseType
    const year = form.caseYear.length === 4 ? form.caseYear : timeGetYear(courtLitigationVo.gCaseYear)
    courtLitigationVo.cCaseNo = `（${year}）|${form.caseCode}|${form.caseZips}|${form.codeOrder}|号`
    courtLitigationVo.cCaseReason = form.cCaseReason
    if (+courtLitigationVo.cCaseType === 13) {
      courtLitigationVo.cCaseReason = form.cCaseReasonMain
      courtLitigationVo.cCaseReason2 = form.cCaseReasonAction
    }
  }
  const litigationOrderVo = {}
  litigationOrderVo.purchaseStatus = form.purchaseStatus
  litigationOrderVo.purchasePlat = form.purchasePlat
  if (+litigationOrderVo.purchasePlat === 1) {
    litigationOrderVo.gId = form.gId
  } else {
    litigationOrderVo.guaranteeType = form.guaranteeType
    litigationOrderVo.guaranteePerson = form.guaranteePerson
    litigationOrderVo.orgId = form.orgId
    litigationOrderVo.guaranteeValue = form.guaranteeValue
    litigationOrderVo.guaranteeDesc = form.guaranteeDesc
  }
  return {
    courtLitigationVo,
    litigationOrderVo
  }
}
