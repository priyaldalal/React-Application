import React from 'react';
import { useForm } from '../hooks/useForm';
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
import { FiSend, FiRefreshCw, FiUserPlus, FiInfo, FiBriefcase } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import Section from '../components/common/Section';
import Button from '../components/ui/Button';

const EmployeeRegistration = () => {
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
    fullName: [commonRules.required('Full Name is required'), commonRules.minLength(3)],
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
      toast.success('Employee registered successfully!');
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
      toast.error('Please fix the errors in the form');
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
    <div className="h-full flex flex-col overflow-hidden max-w-6xl mx-auto pb-12">
      <PageHeader 
        title="Employee Onboarding" 
        subtitle="Configure new team member profiles with enterprise-grade validation."
        actions={
          <Button variant="secondary" onClick={resetForm} icon={FiRefreshCw}>
            Reset All
          </Button>
        }
      />

      <div className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Section 
              title="Personal Details" 
              description="Basic identity information for the employee record."
              icon={FiUserPlus}
            >
              <TextBox 
                label="Full Name" 
                placeholder="John Doe" 
                value={values.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                error={touched.fullName && errors.fullName}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmailBox 
                  label="Email Address" 
                  placeholder="john@example.com" 
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email}
                  required
                />

                <MobileNumberBox 
                  label="Mobile Number" 
                  placeholder="1234567890" 
                  value={values.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  onBlur={() => handleBlur('mobile')}
                  error={touched.mobile && errors.mobile}
                  required
                />
              </div>

              <RadioGroup 
                label="Gender" 
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
                label="Date of Birth" 
                value={values.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                onBlur={() => handleBlur('dob')}
                error={touched.dob && errors.dob}
                required
              />
            </Section>

            {/* Professional Information */}
            <div className="space-y-8">
              <Section 
                title="Work Information" 
                description="Department and technical skill assignments."
                icon={FiBriefcase}
              >
                <SelectionBox 
                  label="Department" 
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
                  label="Technical Skills" 
                  options={skillOptions}
                  value={values.skills}
                  onChange={(val) => handleChange('skills', val)}
                  error={touched.skills && errors.skills}
                  required
                />
              </Section>

              <Section 
                title="Additional Info" 
                description="Profile assets and location data."
                icon={FiInfo}
              >
                <FileUpload 
                  label="Profile Picture" 
                  onChange={(file) => handleChange('profileImage', file)}
                  accept="image/*"
                />
                
                <TextArea 
                  label="Residential Address" 
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
          <Section className="bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-200/50 dark:border-indigo-500/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-4 flex-1">
                <SwitchToggle 
                  label="Active Status" 
                  helperText="Enable immediate access to company resources upon registration."
                  checked={values.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                />
                
                <Checkbox 
                  label="I verify that all information provided is accurate and I accept the company policies." 
                  checked={values.terms}
                  onChange={(e) => handleChange('terms', e.target.checked)}
                  error={touched.terms && errors.terms}
                  required
                />
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="flex-1 md:w-64"
                  icon={FiSend}
                >
                  Register Employee
                </Button>
              </div>
            </div>
          </Section>
        </form>

        {/* Validation Errors Summary */}
        {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
          <div className="p-6 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/30 rounded-2xl">
            <h4 className="text-rose-700 dark:text-rose-400 font-bold mb-2 flex items-center gap-2">
              Registration Requirements Missing:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 list-disc list-inside text-sm text-rose-600 dark:text-rose-400">
              {Object.entries(errors).map(([key, msg]) => msg && (
                <li key={key} className="capitalize font-medium">
                  {key.replace(/([A-Z])/g, ' $1')}: <span className="font-normal opacity-80">{msg}</span>
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

