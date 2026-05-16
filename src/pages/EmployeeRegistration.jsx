import React from 'react';
import { useForm } from '../hooks/useForm';
import { useTranslation } from 'react-i18next';
import { commonRules } from '../utils/validations';
import TextBox from '../components/form/TextBox';
import EmailBox from '../components/form/EmailBox';
import MobileNumberBox from '../components/form/MobileNumberBox';
import SelectionBox from '../components/form/SelectionBox';
import TextArea from '../components/form/TextArea';
import Checkbox from '../components/form/Checkbox';
import SwitchToggle from '../components/form/SwitchToggle';
import RadioGroup from '../components/form/RadioGroup';
import CheckboxGroup from '../components/form/CheckboxGroup';
import DatePicker from '../components/form/DatePicker';
import FileUpload from '../components/form/FileUpload';
import { toast } from 'react-toastify';
import { Send, RefreshCw, UserPlus, Info, Briefcase } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Section from '../components/common/Section';
import Button from '../components/ui/Button';
import { UI_CONFIG } from '../config/uiConfig';

const EmployeeRegistration = () => {
  const { t } = useTranslation('common');
  
  const initialValues = {
    fullName: '',
    email: '',
    mobile: '',
    gender: 'Male',
    department: '',
    skills: [],
    address: '',
    dob: '',
    profileImage: null,
    isActive: true,
    terms: false
  };

  const validationSchema = {
    fullName: [commonRules.required(t('full_name') + ' is required'), commonRules.minLength(3)],
    email: [commonRules.required(), commonRules.email()],
    mobile: [commonRules.required(), commonRules.phone()],
    department: [commonRules.required('Please select a department')],
    skills: [{ required: true, message: 'Select at least one skill' }],
    address: [commonRules.required('Address is required')],
    dob: [commonRules.required('Date of birth is required')],
    terms: [{ required: true, custom: (val) => val === true, message: 'You must accept the terms' }]
  };

  const { values, errors, touched, handleChange, handleBlur, validateForm, resetForm } = useForm(initialValues, validationSchema);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success(t('success'));
      const employees = JSON.parse(localStorage.getItem('app_users') || '[]');
      const newEmployee = { 
        ...values, 
        id: Date.now(), 
        firstName: values.fullName.split(' ')[0], 
        lastName: values.fullName.split(' ')[1] || '',
        status: values.isActive ? 'Active' : 'Inactive',
        company: 'Internal'
      };
      localStorage.setItem('app_users', JSON.stringify([newEmployee, ...employees]));
      resetForm();
    } else {
      toast.error(t('error'));
    }
  };

  const skillOptions = [
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'node' },
    { label: 'Tailwind CSS', value: 'tailwind' },
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-5xl mx-auto pb-8">
      <PageHeader 
        title={t('employee_onboarding')} 
        subtitle={t('onboarding_subtitle')}
        actions={
          <Button variant="secondary" onClick={resetForm} size="sm">
            <RefreshCw size={10} className="mr-2" /> {t('reset_all')}
          </Button>
        }
      />

      <div className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Personal Information */}
            <Section 
              title={t('personal_details')} 
              description={t('personal_details_desc')}
              icon={UserPlus}
            >
              <TextBox 
                label={t('full_name')} 
                placeholder="John Doe" 
                value={values.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                error={touched.fullName && errors.fullName}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <EmailBox 
                  label={t('email_address')} 
                  placeholder="john@example.com" 
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email}
                  required
                />

                <MobileNumberBox 
                  label={t('mobile_number')} 
                  placeholder="1234567890" 
                  value={values.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  onBlur={() => handleBlur('mobile')}
                  error={touched.mobile && errors.mobile}
                  required
                />
              </div>

              <RadioGroup 
                label={t('gender')} 
                name="gender"
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Other', value: 'Other' }
                ]}
                value={values.gender}
                onChange={(val) => handleChange('gender', val)}
                required
              />

              <DatePicker 
                label={t('date_of_birth')} 
                value={values.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                onBlur={() => handleBlur('dob')}
                error={touched.dob && errors.dob}
                required
              />
            </Section>

            {/* Professional Information */}
            <div className="space-y-3">
              <Section 
                title={t('work_information')} 
                description={t('work_information_desc')}
                icon={Briefcase}
              >
                <SelectionBox 
                  label={t('department')} 
                  placeholder="Select Department"
                  options={[
                    { label: 'Engineering', value: 'Engineering' },
                    { label: 'Human Resources', value: 'HR' },
                    { label: 'Marketing', value: 'Marketing' },
                    { label: 'Sales', value: 'Sales' },
                    { label: 'Finance', value: 'Finance' }
                  ]}
                  value={values.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  onBlur={() => handleBlur('department')}
                  error={touched.department && errors.department}
                  required
                />

                <CheckboxGroup 
                  label={t('technical_skills')} 
                  options={skillOptions}
                  value={values.skills}
                  onChange={(val) => handleChange('skills', val)}
                  error={touched.skills && errors.skills}
                  required
                />
              </Section>

              <Section 
                title={t('additional_info')} 
                description={t('additional_info_desc')}
                icon={Info}
              >
                <FileUpload 
                  label={t('profile_picture')} 
                  onChange={(file) => handleChange('profileImage', file)}
                  accept="image/*"
                />
                
                <TextArea 
                  label={t('residential_address')} 
                  placeholder="Enter complete residential address" 
                  value={values.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  onBlur={() => handleBlur('address')}
                  error={touched.address && errors.address}
                  maxLength={200}
                  required
                />
              </Section>
            </div>
          </div>

          {/* Compliance and Activation */}
          <Section className="bg-indigo-50/20 dark:bg-indigo-900/10 border-indigo-100/50 dark:border-indigo-500/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-3 flex-1">
                <SwitchToggle 
                  label={t('active_status')} 
                  helperText={t('active_status_helper')}
                  checked={values.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                />
                
                <Checkbox 
                  label={t('verify_accuracy')} 
                  checked={values.terms}
                  onChange={(e) => handleChange('terms', e.target.checked)}
                  error={touched.terms && errors.terms}
                  required
                />
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <Button 
                  type="submit" 
                  size="sm" 
                  className="flex-1 md:w-48 shadow-lg shadow-indigo-600/20"
                >
                  <Send size={10} className="mr-2" /> {t('register_employee')}
                </Button>
              </div>
            </div>
          </Section>
        </form>

        {/* Validation Errors Summary */}
        {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
          <div className="p-4 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-xl">
            <h4 className="text-rose-700 dark:text-rose-400 text-[10px] font-black mb-2 flex items-center gap-2 uppercase tracking-widest">
              {t('requirements_missing')}
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 list-none text-[9px] text-rose-600 dark:text-rose-400 font-bold uppercase">
              {Object.entries(errors).map(([key, msg]) => msg && (
                <li key={key} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                  {key.replace(/([A-Z])/g, ' $1')}: <span className="font-medium opacity-70 normal-case">{msg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeRegistration;
