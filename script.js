// ================================================
// STEP 1: Formspree par FREE account banao:
//         https://formspree.io
// STEP 2: "New Form" banao, apni email dalo
// STEP 3: Jo Form ID mile (jaise xbjvkpqr)
//         neeche YOUR_FORMSPREE_ID ki jagah lagao
// ================================================
const FORMSPREE_ID = 'https://formspree.io/f/mzdyayav';

function handleSubmit() {
  const fname     = document.getElementById('fname').value.trim();
  const guardname = document.getElementById('guardname').value.trim();
  const phone     = document.getElementById('phone').value.trim();
  const dob       = document.getElementById('dob').value;
  const aadhar    = document.getElementById('aadhar').value.trim();
  const qual      = document.getElementById('qual').value;
  const pyear     = document.getElementById('pyear').value;
  const village   = document.getElementById('village').value.trim();
  const block     = document.getElementById('block').value.trim();
  const msg       = document.getElementById('msg').value.trim();
  const batch     = document.querySelector('input[name="batch"]:checked');
  const terms     = document.getElementById('terms').checked;

  let errors = [];
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

  const regId = 'KBS-2025-' + Math.floor(1000 + Math.random() * 9000);

  const btn = document.querySelector('.submit-btn');
  btn.textContent = '⏳ Submit ho raha hai...';
  btn.disabled = true;

  fetch('https://formspree.io/f/' + FORMSPREE_ID, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      'Registration_ID' : regId,
      'Naam'            : fname,
      'Pita_ka_Naam'    : guardname,
      'Mobile'          : phone,
      'Date_of_Birth'   : dob,
      'Aadhar'          : aadhar,
      'Qualification'   : qual,
      'Passing_Year'    : pyear,
      'Batch'           : batch.value,
      'Gaon'            : village,
      'Block'           : block,
      'Jila'            : 'Gopalganj',
      'Message'         : msg || '(koi sawaal nahi)',
      '_subject'        : 'KBS Academy Naya Registration: ' + fname + ' (' + regId + ')'
    })
  })
  .then(function(res) {
    if (res.ok) {
      document.getElementById('regId').textContent = 'Registration ID: ' + regId;
      document.getElementById('formBody').style.display = 'none';
      document.getElementById('successBox').style.display = 'block';
      document.getElementById('register').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      btn.textContent = '🎓 Register Karo — KYP 2025 Batch';
      btn.disabled = false;
      alert('Kuch galat hua. Dobara try karo ya hamare number par call karo.');
    }
  })
  .catch(function() {
    btn.textContent = '🎓 Register Karo — KYP 2025 Batch';
    btn.disabled = false;
    alert('Internet connection check karo aur dobara try karo.');
  });
}

// Aadhar auto-format: XXXX XXXX XXXX
document.getElementById('aadhar').addEventListener('input', function() {
  let val = this.value.replace(/\D/g, '').substring(0, 12);
  this.value = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
});