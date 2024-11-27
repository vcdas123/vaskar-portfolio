'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface InfoIn {
  icon: ReactNode;
  title: string;
  value: string;
}

const INFO_DATA: InfoIn[] = [
  {
    icon: <FaPhoneAlt />,
    title: 'Mobile',
    value: '+91 8910517164',
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    value: 'vcdas123@gmail.com',
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Address',
    value: 'Kalyani W.B India',
  },
];

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  message: '',
};

const Contact = () => {
  const [formData, setFormData] = useState<typeof initialState>(initialState);
  const [formErrors, setFormErrors] = useState<typeof initialState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstname':
      case 'lastname':
        return value.trim() === '' ? `This field is required` : '';
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
      case 'mobile':
        return /^\d{9,20}$/.test(value.trim()) ? '' : 'Must be between 9 and 20 digits and contain only numbers';
      case 'message':
        return value.trim() === '' ? 'Message cannot be empty' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    setFormErrors(prev => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormErrors(prev => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isLoading) return;
    e.preventDefault();

    const errors: typeof initialState = {
      firstname: validateField('firstname', formData.firstname),
      lastname: validateField('lastname', formData.lastname),
      email: validateField('email', formData.email),
      mobile: validateField('mobile', formData.mobile),
      message: validateField('message', formData.message),
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) return;

    console.log('Form submitted:', formData);

    try {
      setIsLoading(true);
      const res = await fetch('https://vcdas-portfolio-default-rtdb.firebaseio.com/messages.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data && data?.name) {
        console.log(data);
        toast.success('Message sent.');
        setFormData(initialState);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2, duration: 0.4, ease: 'easeIn' } }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* Form Section */}
          <div className="xl:h-[54%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl" onSubmit={handleSubmit}>
              <h3 className="text-4xl text-accent">Let&apos;s work together</h3>
              <p className="text-white/60">We’re just a message away. Let’s partner up and create something great!</p>

              {/* Input Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formErrors.firstname}
                />
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formErrors.lastname}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formErrors.email}
                />
                <Input
                  type="number"
                  name="mobile"
                  placeholder="Mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formErrors.mobile}
                />
              </div>
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.message}
              />
              <Button type="submit">
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Info Section */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {INFO_DATA.map((item: InfoIn, index: number) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <h3>{item.value}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
