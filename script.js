function handleSubmit() {
  var fname     = document.getElementById('fname').value.trim();
  var guardname = document.getElementById('guardname').value.trim();
  var phone     = document.getElementById('phone').value.trim();
  var dob       = document.getElementById('dob').value;
  var aadhar    = document.getElementById('aadhar').value.trim();
  var qual      = document.getElementById('qual').value;
  var pyear     = document.getElementById('pyear').value;
  var village   = document.getElementById('village').value.trim();
  var block     = document.getElementById('block').value.trim();
  var msg       = document.getElementById('msg').value.trim();
  var batch     = document.querySelector('input[name="batch"]:checked');
  var terms     = document.getElementById('terms').checked;

  var errors = [];
  if (!fname)                        errors.push('Pehla naam');
  if (!guardname)                    errors.push('Pita/Pati ka naam');
  if (!phone || phone.length < 10)   errors.push('Sahi mobile number');
  if (!dob)                          errors.push('Date of birth');
  if (!aadhar || aadhar.length < 12) errors.push('Aadhar number');
  if (!qual)                         errors.push('Qualification');
  if (!pyear)                        errors.push('Passing year');
  if (!village)                      errors.push('Gaon/Mohalla');
  if (!block)                        errors.push('Block/Thana');
  if (!batch)                        errors.push('Batch preference');
  if (!terms)                        errors.push('Terms se agree karo');

  if (errors.length > 0) {
    alert('Ye fields fill karo:\n' + errors.join('\n'));
    return;
  }

  var regId = 'KBS-2025-' + Math.floor(1000 + Math.random() * 9000);
  var btn = document.querySelector('.submit-btn');
  btn.textContent = '⏳ Submit ho raha hai...';
  btn.disabled = true;

  var formData = new FormData();
  formData.append('Registration_ID', regId);
  formData.append('Naam', fname);
  formData.append('Pita_ka_Naam', guardname);
  formData.append('Mobile', phone);
  formData.append('Date_of_Birth', dob);
  formData.append('Aadhar', aadhar);
  formData.append('Qualification', qual);
  formData.append('Passing_Year', pyear);
  formData.append('Batch', batch.value);
  formData.append('Gaon', village);
  formData.append('Block', block);
  formData.append('Jila', 'Gopalganj');
  formData.append('Message', msg || '(koi sawaal nahi)');
  formData.append('_subject', 'KBS Academy Registration: ' + fname + ' (' + regId + ')');

  fetch('https://formspree.io/f/mzdyayav', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(function(res) {
    if (res.ok) {
      document.getElementById('regId').textContent = 'Registration ID: ' + regId;
      document.getElementById('formBody').style.display = 'none';
      document.getElementById('successBox').style.display = 'block';
      document.getElementById('register').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      return res.json().then(function(data) {
        btn.textContent = '🎓 Register Karo — KYP 2025 Batch';
        btn.disabled = false;
        alert('Error: ' + (data.error || 'Dobara try karo'));
      });
    }
  })
  .catch(function(err) {
    btn.textContent = '🎓 Register Karo — KYP 2025 Batch';
    btn.disabled = false;
    alert('Network error. Internet check karo aur dobara try karo.');
  });
}

// Aadhar auto-format: XXXX XXXX XXXX
document.getElementById('aadhar').addEventListener('input', function() {
  var val = this.value.replace(/\D/g, '').substring(0, 12);
  this.value = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
});
