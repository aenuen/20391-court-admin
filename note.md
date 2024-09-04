### LF
```
git config --global core.autocrlf true
```

### 重置表单
```
this.$refs.postForm.resetFields()
```

### 验证条件变动时不会立即验证
```
:validate-on-rule-change="false"
```

### 上下左右居中
```
display: flex;
align-items: center; /* 垂直居中 */
justify-content: center; /* 水平居中 */
```

### 去除验证
```
this.$refs.postForm.clearValidate()
```

### 表单提交
```
this.$refs.postForm.validate((valid, fields) => {
this.submitLoadingOpen()
if (valid) {
  //
  if (this.isUpdate) {
	//
	this.submitLoadingClose()
  } else {
	//
	this.submitLoadingClose()
  }
} else {
  this.validateErrHandle(fields)
}
})
```